#!/bin/bash
while ! nc -z db 1433;
do
    echo db is not ready, sleeping;
    sleep 1;
done;
echo Connected!;
cd /ClassifiedAds.Projects && dotnet ClassifiedAds.Migrator.dll

# Keep the line ending
