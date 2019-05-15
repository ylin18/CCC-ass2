chmod 777 ./harvest_city_dbip.sh
nohup ./harvest_city_dbip.sh sydney $1 >/dev/null 2>&1 &
nohup ./harvest_city_dbip.sh melbourne $1 >/dev/null 2>&1 &
nohup ./harvest_city_dbip.sh brisbane $1 >/dev/null 2>&1 &
nohup ./harvest_city_dbip.sh perth $1 >/dev/null 2>&1 &