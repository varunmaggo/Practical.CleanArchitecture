#!/bin/bash
while ! nc -z migrator 80;
do
    echo migrator is not ready, sleeping;
    sleep 1;
done;
echo migrator is ready!;
cd /ClassifiedAds.Projects && dotnet ClassifiedAds.BackgroundServices.dll

# Keep the line ending
