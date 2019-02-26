#! /bin/bash

# Paths
dir_askomics=$(dirname "$0")
dir_venv="$dir_askomics/venv"
dir_node_modules="$dir_askomics/node_modules"
dir_package_lock_file="$dir_askomics/package-lock.json"
activate="$dir_venv/bin/activate"

echo "Removing python cache ..."
find . | grep -E "(__pycache__|\.pyc|\.pyo$)" | xargs rm -rf

echo "Deleting venv ..."
rm -rf $dir_venv

echo "Deleting node modules ..."
rm -rf $dir_package_lock_file
rm -rf $dir_node_modules