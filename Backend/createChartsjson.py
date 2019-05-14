import couchdb
import json
import operator

couch = couchdb.Server('http://admin:123456@172.26.37.189:5984')

melbpast = couch['melbourne_past_']
sydneypast = couch['sydney_past_']
perthpast = couch['perth_past_']
brispast = couch['brisbane_past_']

melbrecent = couch['melbourne_recent_']
sydneyrecent = couch['sydney_recent_']
perthrecent = couch['perth_recent_']
brisrecent = couch['brisbane_recent_']

locdb = {
	'melbourne' : melbpast,
	'sydney' : sydneypast,
	'perth' : perthpast,
	'brisbane' : brispast
}
locdb19 = {
	'melbourne' : melbrecent,
	'sydney' : sydneyrecent,
	'perth' : perthrecent,
	'brisbane' : brisrecent
}


def getGluttonynum(location, y):
	loc = location
	year = y

	if year == 19:
		db = locdb19[loc]
	else:
		db = locdb[loc]

	user_food_cnt = {}
	dv = db.view('_design/foodtags/_view/userfood-view'+str(year), reduce=True, group=True)

	for row in dv:
		user_food_cnt[row.key] = row.value['count']

	sorted_food_cnt = sorted(user_food_cnt.items(), key=operator.itemgetter(1), reverse=True)
	l = len([i for i in sorted_food_cnt if i[1] > 10])

	return json.dumps({ "num" : l })


def getFoodtags(location, y):
	loc = location
	year = y

	if year == 19:
		db = locdb19[loc]
	else:
		db = locdb[loc]

	user_food_cnt = {}
	dv = db.view('_design/foodtags/_view/foodtags-view'+str(year), reduce=True, group=True)

	for row in dv:
		user_food_cnt[row.key] = row.value['count']

	sorted_food_cnt = sorted(user_food_cnt.items(), key=operator.itemgetter(1), reverse=True)

	return json.dumps({ "foodtags" : sorted_food_cnt[:5] })


def getTimeblock(location, y):
	loc = location
	year = y

	if year == 19:
		db = locdb19[loc]
	else:
		db = locdb[loc]

	timeblock_cnt = {}
	dv = db.view('_design/timeblock/_view/time-view'+str(year), reduce=True, group=True)

	for row in dv:
		timeblock_cnt[row.key] = row.value['count']

	return json.dumps({ "timeblocks" : timeblock_cnt })


if __name__ == '__main__':
	years = [14,15,19]     # [14,15,16,17,18,19]
	locations = ['melbourne','sydney','perth','brisbane']
	collectionlist = []
	for i in range(len(years)):
		citieslist = []
		for j in range(len(locations)):
			nums = json.loads(getGluttonynum(locations[j],years[i]))
			foodtags = json.loads(getFoodtags(locations[j],years[i]))
			timeblocks = json.loads(getTimeblock(locations[j],years[i]))

			o = {
				"city": locations[j].capitalize(),
				"nums": nums["num"],
				"foodtags": foodtags["foodtags"],
				"timeblocks":timeblocks["timeblocks"]
			}
			citieslist.append(o)
		yo = {
			"year": years[i],
      		"cities": citieslist
		}
		collectionlist.append(yo)

	resulto = {
		"collections" : collectionlist
	}

	with open('chartsD.json', 'w') as outfile:  
		json.dump(resulto, outfile)
	print('done')





