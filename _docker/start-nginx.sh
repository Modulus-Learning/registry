#!/bin/sh

# https://github.com/Supervisor/supervisor/issues/122#issuecomment-1019548776
# Hacky - but we want to give the node process above time to start, as well as
# retrieve the AWS AZ in the start.hs script

# echo "Starting nginx...."
# sleep 5
# read -p "Waiting 5 seconds before starting nginx." -t 5

echo -e "\n==> Starting Nginx...."

# while [[ $(ps -aux | grep "node -r") == "" ]];
# do
#     echo "Waiting for Node.js to come up to start nginx..."
#     sleep 2s
#     if [[ $(ps -aux | grep "node -r") != "" ]]; then
#         echo "Node.js appears to have started, starting nginx."
#         ps -aux | grep "node -r"
#     fi
# done

nginx -g "daemon off;"
