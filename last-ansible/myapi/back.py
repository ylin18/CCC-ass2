from flask import Flask
from flask import stream_with_context, request, Response
from flask import send_file
from flask import jsonify
from flask_cors import CORS
# import couchdb
import json
import operator
"""
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
"""
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
"""
# not in use
@app.route('/api/mapview', methods=['POST'])
def f():
	if not request.json or not 'location' in request.json:
		abort(400)
	loc = request.json['location']
	year = request.json['year']

	if year == 19:
		db = locdb19[loc]
	else:
		db = locdb[loc]

	dv = db.view('_design/mapview/_view/map-view'+str(year))

	feature_list = []
	for row in dv:
		feat = {
			"type": "Feature",
			"properties":{
				"message": row.key
				#content
			},
			"geometry": {
				"coordinates": row.value,
				"type": "Point"
			}
		}
		feature_list.append(feat)


	result_list = {
		"type": "FeatureCollection",
		"features": feature_list
	}

	return jsonify({'result': result_list})



@app.route('/api/gluttonynum', methods=['POST'])
def getGluttonynum():
	if not request.json or not 'location' in request.json:
		abort(400)
	loc = request.json['location']
	year = request.json['year']

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

	return jsonify({ 'num' : l })


@app.route('/api/foodtags', methods=['POST'])
def getFoodtags():
	if not request.json or not 'location' in request.json:
		abort(400)
	loc = request.json['location']
	year = request.json['year']

	if year == 19:
		db = locdb19[loc]
	else:
		db = locdb[loc]

	user_food_cnt = {}
	dv = db.view('_design/foodtags/_view/foodtags-view'+str(year), reduce=True, group=True)

	for row in dv:
		user_food_cnt[row.key] = row.value['count']

	sorted_food_cnt = sorted(user_food_cnt.items(), key=operator.itemgetter(1), reverse=True)

	return jsonify({ 'foodtags' : sorted_food_cnt[:5] })


@app.route('/api/timeblocks', methods=['POST'])
def getTimeblock():
	if not request.json or not 'location' in request.json:
		abort(400)
	loc = request.json['location']
	year = request.json['year']

	if year == 19:
		db = locdb19[loc]
	else:
		db = locdb[loc]

	timeblock_cnt = {}
	dv = db.view('_design/timeblock/_view/time-view'+str(year), reduce=True, group=True)

	for row in dv:
		timeblock_cnt[row.key] = row.value['count']

	return jsonify({ 'timeblocks' : timeblock_cnt })


@app.route('/api/plpnum', methods=['POST'])
def getPlpnum():
	if not request.json or not 'location' in request.json:
		abort(400)
	loc = request.json['location']
	year = request.json['year']

	if year == 19:
		db = locdb19[loc]
	else:
		db = locdb[loc]

	timeblock_cnt = {}
	dv = db.view('_design/plpview/_view/plp-view'+str(year), reduce=True, group=True)
	cnt = 0
	for i in dv:
		cnt+=1

	return jsonify({ "plpnum" : cnt })

@app.route('/api/tweetsnum', methods=['POST'])
def getTweetnum():
	if not request.json or not 'location' in request.json:
		abort(400)
	loc = request.json['location']
	year = request.json['year']

	if year == 19:
		db = locdb19[loc]
	else:
		db = locdb[loc]

	timeblock_cnt = {}
	dv = db.view('_design/plpview/_view/tweetnum-view'+str(year))
	cnt = 0
	for i in dv:
		cnt+=1

	return jsonify({ "tweetnum" : cnt })
"""
# Rondo codes
@app.route('/aurinObese',methods=['GET'])
def aurinObese():
	try:
		return send_file('./data/aurinObese.json', attachment_filename='aurinObese.json')
	except Exception as e:
		return str(e)

@app.route('/aurinOverweight',methods=['GET'])
def aurinOverweight():
	try:
		return send_file('./data/aurinOverweight.json', attachment_filename='aurinOverweight.json')
	except Exception as e:
		return str(e)

@app.route('/twrGeometry',methods=['GET'])
def aurinTwr():
	try:
		return send_file('./data/twrGeometry.json', attachment_filename='twrGeometry.json')
	except Exception as e:
		return str(e)

@app.route('/past_Geo/<name>/<time>',methods=['GET'])
def past_Geo(name,time):
	print(name)
	try:
		filename = name + "_past_Geo" + time + ".json"
		dir  = "./data/" + filename
		return send_file(dir, attachment_filename=filename)
	except Exception as e:
		return str(e)

@app.route('/getChartData', methods=['GET'])
def getCharts():
	try:
		return send_file('./data/chartD.json', attachment_filename='chartD.json')
	except Exception as e:
		return str(e)

@app.route('/api/test/hello', methods=['GET'])
def hellof():
	return "hello"


if __name__ == '__main__':
	app.run(host='0.0.0.0',port=8081)
	# app.run() 
