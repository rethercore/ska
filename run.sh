now=$(date "+%Y.%m.%d-%H.%M.%S")
echo "MongoDB Export Started and stored in file $now.csv"
mongoexport --db sikka --collection sikkas --fieldFile fields.txt --type csv --out $now.csv
