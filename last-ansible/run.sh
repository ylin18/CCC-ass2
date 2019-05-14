#Coding by xudong Ma at 01/05/2019
#!/bin/bash
#. ./openrc.sh; ansible-playbook instances_create.yml
#sleep 200 #in order to wait the instances prepared for visiting
#ansible-playbook -i ./inventory/hosts.ini docker_install.yml
ansible-playbook -i ./inventory/hosts.ini couchdb_deploy.yml
#ansible-playbook -i ./inventory/hosts.ini services_deploy.yml
