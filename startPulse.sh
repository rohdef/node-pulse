#!/bin/env bash

echo "===="
dbus-launch --version
dbus-launch

echo "===="
echo $USER
id
ls -l /var/run/dbus


echo "===="
pulseaudio -v
pulseaudio --start
