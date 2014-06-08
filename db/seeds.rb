# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Page.create(name: "homepage", week: 1, link: "/", description: "homepage for the website")
Page.create(name: "simple dice", week: 2, link: "/dice", description: "simple dice rolling program")
Page.create(name: "simple dice v2", week: 3, link: "/dice2", description: "v2 of simple dice rolling program")
Page.create(name: "my_math", week: 4, link: "/my_math", description: "fibonacci sequence, factorial, and cryptosquare")
