#!/bin/env bash

# Fix display bug from dbus
export DISPLAY=:99.0

sh -e /etc/init.d/xvfb start
sleep 3

dbus-cleanup-sockets

echo "Starting dbus"
dbus-launch

echo "Starting pulseaudio"
pulseaudio --start
