#!/bin/bash
#Authors: Sami Lababidi
#Date: 09/23/2020

cp /var/log/syslog syslog

egrep --color=always -i "error" syslog | tee error_log_check.txt

echo "This text file contains the error log" | mailx -A error_log_check.txt -s "Lab 4 Error Log" sala8822@colorado.edu


