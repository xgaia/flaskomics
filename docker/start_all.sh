#! /bin/bash

################################################
#                                              #
#   Run AskOmics inside the Docker container   #
#                                              #
################################################

# Start Redis
nohup /usr/bin/redis-server &> /var/log/redis-server &

# Start virtuoso
nohup /virtuoso.sh &> /var/log/virtuoso &

# Create default user
/askomics/add_user.sh

if [[ $depmode == "dev" ]]; then
    # Rebuild JS with dev mode
    npm run dev &
fi

# Wait for virtuoso to be up
while ! wget -O /dev/null http://localhost:8890/conductor; do
    sleep 1s
done

# Start Celery
/askomics/run_celery.sh -d ${DEPMODE} -c ${MAX_CELERY_QUEUE} &

# Start AskOmics
/askomics/run_askomics.sh -d ${DEPMODE}