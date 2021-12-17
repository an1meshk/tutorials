#!/bin/bash

# look for runtime env file
if [ ! -z "${2}" ]; then
  envFile="${1}"/env."${2}"
fi

#If can't find it then exit
if [[ ! -f "$envFile" ]]; then
echo "Env file doesn't exist!"
exit 1;
fi

  
# create runtime env JS file
if [[ ! -z "${1}" ]]; then
  envJs="${1}/env-config.js"
fi

#Recreate config file
rm -rf ${envJs}
touch ${envJs}

# Add assignment 
echo "window._env_ = {" >> ${envJs}

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}
  
  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >> ${envJs}
done < ${envFile}

echo "};" >> "${envJs}"

echo "generated ${envJs} with content"
cat ${envJs}