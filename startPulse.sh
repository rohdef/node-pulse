#!/bin/env bash

systemctl status dbus.socket dbus.service

dbus-launch --version
dbus-launch

systemctl status dbus.socket dbus.service

pulseaudio -v
pulseaudio --start
