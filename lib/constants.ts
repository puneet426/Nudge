export enum CollectionColors{
sunset="bg-gradient-to-r from-red-500 to-orange-500", 
oceanBlue="bg-gradient-to-r from-cyan-500 to-blue-500" ,
purpleBliss="bg-gradient-to-r from-purple-500 to-pink-500", 
mojito="bg-gradient-to-r from-green-400 to-lime-500" ,
spaceGray="bg-gradient-to-r from-gray-700 to-gray-900" ,
aurora="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" ,
electric="bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500" ,
iceBlue="bg-gradient-to-r from-sky-400 to-blue-600" ,
mangoTwist="bg-gradient-to-r from-yellow-400 to-orange-500", 
zenMist="bg-gradient-to-r from-teal-400 to-cyan-500" ,
mintLeaf="bg-gradient-to-r from-emerald-400 to-green-500" ,
sunrise="bg-gradient-to-r from-pink-400 to-yellow-400" ,
lava="bg-gradient-to-r from-orange-600 to-red-600" ,
blueLagoon="bg-gradient-to-r from-blue-500 to-indigo-600", 
peachy="bg-gradient-to-r from-pink-500 to-rose-400",

}
export type CollectionColor = keyof typeof CollectionColors;