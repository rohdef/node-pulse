#!/bin/env bash

echo "===="
ls /var/run/

echo "===="
ls /var/run/dbus

echo "===="
dbus-launch --version
dbus-launch

echo "===="
ls /var/run/

echo "===="
ls /var/run/dbus

mkdir -p /var/run/dbus
ln -s /tmp/dbus* /var/run/dbus/system_bus_socket


echo "===="
ls /var/run/

echo "===="
ls /var/run/dbus

echo "===="
pulseaudio -v
pulseaudio --start
