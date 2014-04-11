# Installation 

## Prequisites 

* MongoDB installed and running on it default port (27017)
* Node.js & npm, latest and greatest

## Setup

Edit config.json to set the port for the app (default is 1234)

npm install; // install project dependencies. 

node app.js //to run


# Project Description

## Details

* A Widget can come from either the AA or BB factory
* All Widgets have the following required attributes of sku, length, width, height
* Widgets from the AA Factory have additional optional attributes of weight, color
* Widgets from the BB Factory have additional optional attributes of material, expiration date
* Inventory of all widgets needs to be tracked

## Requirements

* A form to enter and store new Widgets from either Factory into Inventory
* A way to display the inventory of all widgets from all factories
* A way to filter the display to show the inventory of all widgets for a specific factory
* Must be a responsive design
* This is not a design project and the page can just spit out a very basic HTML and be otherwise underdesigned.

# Developer Notes

The last two parts of the requirements were taken literally. There is no CSS in the project
and basic (but well formed) html was used. As this doesn't have any styling or layout details
it is by definition responsive (it could be viewed well on practially any device from any era). 