# python3 tweets_search_harvester.py "Melbourne" "admin:123456@172.26.37.241:5984"
import tweepy
import json
import couchdb
import time
import config
import sys
import tweets_analysis
import datetime

start = time.time()

def get_api(app_id):
	consumer_key = config.app_keys_tokens[app_id]['consumer_key']
	consumer_secret = config.app_keys_tokens[app_id]['consumer_secret']
	access_token = config.app_keys_tokens[app_id]['access_token']
	access_token_secret = config.app_keys_tokens[app_id]['access_token_secret']
	auth = tweepy.AppAuthHandler(consumer_key, consumer_secret)
	return tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)

if __name__ == '__main__':

	if len(sys.argv) >= 3:
		city_name = sys.argv[1]
		geocode = config.geocodes[city_name]
		IPaddress = sys.argv[2]
	else:
		print('no enough parameter!')
		sys.exit(0)

	app_id = config.search_appid[city_name]
	api = get_api(app_id=app_id)

	db_name = city_name + '_recent_'
	couchserver = couchdb.Server("http://%s/" % IPaddress)
	try:
		db = couchserver.create(db_name)
	except:
		db = couchserver[db_name]

	## search method ##
	sincedate = datetime.date.today() - datetime.timedelta(days=3)
	untildate = datetime.date.today()
	tweets = tweepy.Cursor(api.search, since=sincedate, until=untildate,\
		geocode=geocode, tweet_mode='extended').items()
	print('---------- Now collecting Tweets ----------')
	while True:
		try:
			tweet = tweets.next()._json
			time_period = tweets_analysis.get_period(tweet['created_at'])
			food_list = tweets_analysis.get_foods(tweet['full_text'])
			if tweet['is_quote_status'] == True and 'quoted_status' in tweet:
				quoted_status = tweet['quoted_status']
			else:
				quoted_status = None

			new_dic = {
			'_id':tweet['id_str'],
			'created_at':tweet['created_at'],
			'full_text':tweet['full_text'],
			'entities':tweet['entities'],
			'source':tweet['source'],
			'user':tweet['user'],
			'geo':tweet['geo'],
			'coordinates':tweet['coordinates'],
			'place':tweet['place'],
			'lang':tweet['lang'],
			'retweet_count':tweet['retweet_count'],
			'favorite_count':tweet['favorite_count'],
			'is_quote_status':tweet['is_quote_status'],
			'quoted_status':quoted_status,
			'city':city_name,
			'weekday':time_period[0],
			'month':time_period[1],
			'day':time_period[2],
			'hour':time_period[3],
			'year':time_period[4],
			'foods': food_list
			}
			db.save(new_dic)

		except tweepy.TweepError as e1:
			print(e1.reason)
			print('tweet limit!!!')
			time.sleep(60 * 15)
			continue
		except StopIteration as e2:
			print("Finish search!")
			break
		except Exception as e3:
			print(e3)
			time.sleep(60 * 5)
			continue
	print('time used: ', time.time()-start)
