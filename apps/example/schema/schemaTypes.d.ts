/* tslint:disable */
/* An object with an ID */
export interface Node {
  id: string /* The id of the object. */;
}

export interface Root {
  allFilms?: FilmsConnection | null;
  film?: Film | null;
  allPeople?: PeopleConnection | null;
  person?: Person | null;
  allPlanets?: PlanetsConnection | null;
  planet?: Planet | null;
  allSpecies?: SpeciesConnection | null;
  species?: Species | null;
  allStarships?: StarshipsConnection | null;
  starship?: Starship | null;
  allVehicles?: VehiclesConnection | null;
  vehicle?: Vehicle | null;
  node?: Node | null /* Fetches an object given its ID */;
}
/* A connection to a list of items. */
export interface FilmsConnection {
  pageInfo: PageInfo /* Information to aid in pagination. */;
  edges?: FilmsEdge[] | null /* A list of edges. */;
  totalCount?:
    | number
    | null /* A count of the total number of objects in this connection, ignoring pagination.This allows a client to fetch the first five objects by passing &quot;5&quot; as theargument to &quot;first&quot;, then fetch the total count so it could display &quot;5 of 83&quot;,for example. */;
  films?:
    | Film[]
    | null /* A list of all of the objects returned in the connection. This is a conveniencefield provided for quickly exploring the API; rather than querying for&quot;{ edges { node } }&quot; when no edge data is needed, this field can be be usedinstead. Note that when clients like Relay need to fetch the &quot;cursor&quot; field onthe edge to enable efficient pagination, this shortcut cannot be used, and thefull &quot;{ edges { node } }&quot; version should be used instead. */;
}
/* Information about pagination in a connection. */
export interface PageInfo {
  hasNextPage: boolean /* When paginating forwards, are there more items? */;
  hasPreviousPage: boolean /* When paginating backwards, are there more items? */;
  startCursor?: string | null /* When paginating backwards, the cursor to continue. */;
  endCursor?: string | null /* When paginating forwards, the cursor to continue. */;
}
/* An edge in a connection. */
export interface FilmsEdge {
  node?: Film | null /* The item at the end of the edge */;
  cursor: string /* A cursor for use in pagination */;
}
/* A single film. */
export interface Film extends Node {
  title?: string | null /* The title of this film. */;
  episodeID?: number | null /* The episode number of this film. */;
  openingCrawl?: string | null /* The opening paragraphs at the beginning of this film. */;
  director?: string | null /* The name of the director of this film. */;
  producers?: string[] | null /* The name(s) of the producer(s) of this film. */;
  releaseDate?: string | null /* The ISO 8601 date format of film release at original creator country. */;
  speciesConnection?: FilmSpeciesConnection | null;
  starshipConnection?: FilmStarshipsConnection | null;
  vehicleConnection?: FilmVehiclesConnection | null;
  characterConnection?: FilmCharactersConnection | null;
  planetConnection?: FilmPlanetsConnection | null;
  created?: string | null /* The ISO 8601 date format of the time that this resource was created. */;
  edited?: string | null /* The ISO 8601 date format of the time that this resource was edited. */;
  id: string /* The ID of an object */;
}
/* A connection to a list of items. */
export interface FilmSpeciesConnection {
  pageInfo: PageInfo /* Information to aid in pagination. */;
  edges?: FilmSpeciesEdge[] | null /* A list of edges. */;
  totalCount?:
    | number
    | null /* A count of the total number of objects in this connection, ignoring pagination.This allows a client to fetch the first five objects by passing &quot;5&quot; as theargument to &quot;first&quot;, then fetch the total count so it could display &quot;5 of 83&quot;,for example. */;
  species?:
    | Species[]
    | null /* A list of all of the objects returned in the connection. This is a conveniencefield provided for quickly exploring the API; rather than querying for&quot;{ edges { node } }&quot; when no edge data is needed, this field can be be usedinstead. Note that when clients like Relay need to fetch the &quot;cursor&quot; field onthe edge to enable efficient pagination, this shortcut cannot be used, and thefull &quot;{ edges { node } }&quot; version should be used instead. */;
}
/* An edge in a connection. */
export interface FilmSpeciesEdge {
  node?: Species | null /* The item at the end of the edge */;
  cursor: string /* A cursor for use in pagination */;
}
/* A type of person or character within the Star Wars Universe. */
export interface Species extends Node {
  name?: string | null /* The name of this species. */;
  classification?:
    | string
    | null /* The classification of this species, such as &quot;mammal&quot; or &quot;reptile&quot;. */;
  designation?: string | null /* The designation of this species, such as &quot;sentient&quot;. */;
  averageHeight?: number | null /* The average height of this species in centimeters. */;
  averageLifespan?: number | null /* The average lifespan of this species in years, null if unknown. */;
  eyeColors?:
    | string[]
    | null /* Common eye colors for this species, null if this species does not typicallyhave eyes. */;
  hairColors?:
    | string[]
    | null /* Common hair colors for this species, null if this species does not typicallyhave hair. */;
  skinColors?:
    | string[]
    | null /* Common skin colors for this species, null if this species does not typicallyhave skin. */;
  language?: string | null /* The language commonly spoken by this species. */;
  homeworld?: Planet | null /* A planet that this species originates from. */;
  personConnection?: SpeciesPeopleConnection | null;
  filmConnection?: SpeciesFilmsConnection | null;
  created?: string | null /* The ISO 8601 date format of the time that this resource was created. */;
  edited?: string | null /* The ISO 8601 date format of the time that this resource was edited. */;
  id: string /* The ID of an object */;
}
/* A large mass, planet or planetoid in the Star Wars Universe, at the time of0 ABY. */
export interface Planet extends Node {
  name?: string | null /* The name of this planet. */;
  diameter?: number | null /* The diameter of this planet in kilometers. */;
  rotationPeriod?:
    | number
    | null /* The number of standard hours it takes for this planet to complete a singlerotation on its axis. */;
  orbitalPeriod?:
    | number
    | null /* The number of standard days it takes for this planet to complete a single orbitof its local star. */;
  gravity?:
    | string
    | null /* A number denoting the gravity of this planet, where &quot;1&quot; is normal or 1 standardG. &quot;2&quot; is twice or 2 standard Gs. &quot;0.5&quot; is half or 0.5 standard Gs. */;
  population?: number | null /* The average population of sentient beings inhabiting this planet. */;
  climates?: string[] | null /* The climates of this planet. */;
  terrains?: string[] | null /* The terrains of this planet. */;
  surfaceWater?:
    | number
    | null /* The percentage of the planet surface that is naturally occuring water or bodiesof water. */;
  residentConnection?: PlanetResidentsConnection | null;
  filmConnection?: PlanetFilmsConnection | null;
  created?: string | null /* The ISO 8601 date format of the time that this resource was created. */;
  edited?: string | null /* The ISO 8601 date format of the time that this resource was edited. */;
  id: string /* The ID of an object */;
}
/* A connection to a list of items. */
export interface PlanetResidentsConnection {
  pageInfo: PageInfo /* Information to aid in pagination. */;
  edges?: PlanetResidentsEdge[] | null /* A list of edges. */;
  totalCount?:
    | number
    | null /* A count of the total number of objects in this connection, ignoring pagination.This allows a client to fetch the first five objects by passing &quot;5&quot; as theargument to &quot;first&quot;, then fetch the total count so it could display &quot;5 of 83&quot;,for example. */;
  residents?:
    | Person[]
    | null /* A list of all of the objects returned in the connection. This is a conveniencefield provided for quickly exploring the API; rather than querying for&quot;{ edges { node } }&quot; when no edge data is needed, this field can be be usedinstead. Note that when clients like Relay need to fetch the &quot;cursor&quot; field onthe edge to enable efficient pagination, this shortcut cannot be used, and thefull &quot;{ edges { node } }&quot; version should be used instead. */;
}
/* An edge in a connection. */
export interface PlanetResidentsEdge {
  node?: Person | null /* The item at the end of the edge */;
  cursor: string /* A cursor for use in pagination */;
}
/* An individual person or character within the Star Wars universe. */
export interface Person extends Node {
  name?: string | null /* The name of this person. */;
  birthYear?:
    | string
    | null /* The birth year of the person, using the in-universe standard of BBY or ABY -Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin isa battle that occurs at the end of Star Wars episode IV: A New Hope. */;
  eyeColor?:
    | string
    | null /* The eye color of this person. Will be &quot;unknown&quot; if not known or &quot;n/a&quot; if theperson does not have an eye. */;
  gender?:
    | string
    | null /* The gender of this person. Either &quot;Male&quot;, &quot;Female&quot; or &quot;unknown&quot;,&quot;n/a&quot; if the person does not have a gender. */;
  hairColor?:
    | string
    | null /* The hair color of this person. Will be &quot;unknown&quot; if not known or &quot;n/a&quot; if theperson does not have hair. */;
  height?: number | null /* The height of the person in centimeters. */;
  mass?: number | null /* The mass of the person in kilograms. */;
  skinColor?: string | null /* The skin color of this person. */;
  homeworld?: Planet | null /* A planet that this person was born on or inhabits. */;
  filmConnection?: PersonFilmsConnection | null;
  species?: Species | null /* The species that this person belongs to, or null if unknown. */;
  starshipConnection?: PersonStarshipsConnection | null;
  vehicleConnection?: PersonVehiclesConnection | null;
  created?: string | null /* The ISO 8601 date format of the time that this resource was created. */;
  edited?: string | null /* The ISO 8601 date format of the time that this resource was edited. */;
  id: string /* The ID of an object */;
}
/* A connection to a list of items. */
export interface PersonFilmsConnection {
  pageInfo: PageInfo /* Information to aid in pagination. */;
  edges?: PersonFilmsEdge[] | null /* A list of edges. */;
  totalCount?:
    | number
    | null /* A count of the total number of objects in this connection, ignoring pagination.This allows a client to fetch the first five objects by passing &quot;5&quot; as theargument to &quot;first&quot;, then fetch the total count so it could display &quot;5 of 83&quot;,for example. */;
  films?:
    | Film[]
    | null /* A list of all of the objects returned in the connection. This is a conveniencefield provided for quickly exploring the API; rather than querying for&quot;{ edges { node } }&quot; when no edge data is needed, this field can be be usedinstead. Note that when clients like Relay need to fetch the &quot;cursor&quot; field onthe edge to enable efficient pagination, this shortcut cannot be used, and thefull &quot;{ edges { node } }&quot; version should be used instead. */;
}
/* An edge in a connection. */
export interface PersonFilmsEdge {
  node?: Film | null /* The item at the end of the edge */;
  cursor: string /* A cursor for use in pagination */;
}
/* A connection to a list of items. */
export interface PersonStarshipsConnection {
  pageInfo: PageInfo /* Information to aid in pagination. */;
  edges?: PersonStarshipsEdge[] | null /* A list of edges. */;
  totalCount?:
    | number
    | null /* A count of the total number of objects in this connection, ignoring pagination.This allows a client to fetch the first five objects by passing &quot;5&quot; as theargument to &quot;first&quot;, then fetch the total count so it could display &quot;5 of 83&quot;,for example. */;
  starships?:
    | Starship[]
    | null /* A list of all of the objects returned in the connection. This is a conveniencefield provided for quickly exploring the API; rather than querying for&quot;{ edges { node } }&quot; when no edge data is needed, this field can be be usedinstead. Note that when clients like Relay need to fetch the &quot;cursor&quot; field onthe edge to enable efficient pagination, this shortcut cannot be used, and thefull &quot;{ edges { node } }&quot; version should be used instead. */;
}
/* An edge in a connection. */
export interface PersonStarshipsEdge {
  node?: Starship | null /* The item at the end of the edge */;
  cursor: string /* A cursor for use in pagination */;
}
/* A single transport craft that has hyperdrive capability. */
export interface Starship extends Node {
  name?: string | null /* The name of this starship. The common name, such as &quot;Death Star&quot;. */;
  model?:
    | string
    | null /* The model or official name of this starship. Such as &quot;T-65 X-wing&quot; or &quot;DS-1Orbital Battle Station&quot;. */;
  starshipClass?:
    | string
    | null /* The class of this starship, such as &quot;Starfighter&quot; or &quot;Deep Space MobileBattlestation&quot; */;
  manufacturers?: string[] | null /* The manufacturers of this starship. */;
  costInCredits?: number | null /* The cost of this starship new, in galactic credits. */;
  length?: number | null /* The length of this starship in meters. */;
  crew?: string | null /* The number of personnel needed to run or pilot this starship. */;
  passengers?: string | null /* The number of non-essential people this starship can transport. */;
  maxAtmospheringSpeed?:
    | number
    | null /* The maximum speed of this starship in atmosphere. null if this starship isincapable of atmosphering flight. */;
  hyperdriveRating?: number | null /* The class of this starships hyperdrive. */;
  MGLT?:
    | number
    | null /* The Maximum number of Megalights this starship can travel in a standard hour.A &quot;Megalight&quot; is a standard unit of distance and has never been defined beforewithin the Star Wars universe. This figure is only really useful for measuringthe difference in speed of starships. We can assume it is similar to AU, thedistance between our Sun (Sol) and Earth. */;
  cargoCapacity?: number | null /* The maximum number of kilograms that this starship can transport. */;
  consumables?:
    | string
    | null /* The maximum length of time that this starship can provide consumables for itsentire crew without having to resupply. */;
  pilotConnection?: StarshipPilotsConnection | null;
  filmConnection?: StarshipFilmsConnection | null;
  created?: string | null /* The ISO 8601 date format of the time that this resource was created. */;
  edited?: string | null /* The ISO 8601 date format of the time that this resource was edited. */;
  id: string /* The ID of an object */;
}
/* A connection to a list of items. */
export interface StarshipPilotsConnection {
  pageInfo: PageInfo /* Information to aid in pagination. */;
  edges?: StarshipPilotsEdge[] | null /* A list of edges. */;
  totalCount?:
    | number
    | null /* A count of the total number of objects in this connection, ignoring pagination.This allows a client to fetch the first five objects by passing &quot;5&quot; as theargument to &quot;first&quot;, then fetch the total count so it could display &quot;5 of 83&quot;,for example. */;
  pilots?:
    | Person[]
    | null /* A list of all of the objects returned in the connection. This is a conveniencefield provided for quickly exploring the API; rather than querying for&quot;{ edges { node } }&quot; when no edge data is needed, this field can be be usedinstead. Note that when clients like Relay need to fetch the &quot;cursor&quot; field onthe edge to enable efficient pagination, this shortcut cannot be used, and thefull &quot;{ edges { node } }&quot; version should be used instead. */;
}
/* An edge in a connection. */
export interface StarshipPilotsEdge {
  node?: Person | null /* The item at the end of the edge */;
  cursor: string /* A cursor for use in pagination */;
}
/* A connection to a list of items. */
export interface StarshipFilmsConnection {
  pageInfo: PageInfo /* Information to aid in pagination. */;
  edges?: StarshipFilmsEdge[] | null /* A list of edges. */;
  totalCount?:
    | number
    | null /* A count of the total number of objects in this connection, ignoring pagination.This allows a client to fetch the first five objects by passing &quot;5&quot; as theargument to &quot;first&quot;, then fetch the total count so it could display &quot;5 of 83&quot;,for example. */;
  films?:
    | Film[]
    | null /* A list of all of the objects returned in the connection. This is a conveniencefield provided for quickly exploring the API; rather than querying for&quot;{ edges { node } }&quot; when no edge data is needed, this field can be be usedinstead. Note that when clients like Relay need to fetch the &quot;cursor&quot; field onthe edge to enable efficient pagination, this shortcut cannot be used, and thefull &quot;{ edges { node } }&quot; version should be used instead. */;
}
/* An edge in a connection. */
export interface StarshipFilmsEdge {
  node?: Film | null /* The item at the end of the edge */;
  cursor: string /* A cursor for use in pagination */;
}
/* A connection to a list of items. */
export interface PersonVehiclesConnection {
  pageInfo: PageInfo /* Information to aid in pagination. */;
  edges?: PersonVehiclesEdge[] | null /* A list of edges. */;
  totalCount?:
    | number
    | null /* A count of the total number of objects in this connection, ignoring pagination.This allows a client to fetch the first five objects by passing &quot;5&quot; as theargument to &quot;first&quot;, then fetch the total count so it could display &quot;5 of 83&quot;,for example. */;
  vehicles?:
    | Vehicle[]
    | null /* A list of all of the objects returned in the connection. This is a conveniencefield provided for quickly exploring the API; rather than querying for&quot;{ edges { node } }&quot; when no edge data is needed, this field can be be usedinstead. Note that when clients like Relay need to fetch the &quot;cursor&quot; field onthe edge to enable efficient pagination, this shortcut cannot be used, and thefull &quot;{ edges { node } }&quot; version should be used instead. */;
}
/* An edge in a connection. */
export interface PersonVehiclesEdge {
  node?: Vehicle | null /* The item at the end of the edge */;
  cursor: string /* A cursor for use in pagination */;
}
/* A single transport craft that does not have hyperdrive capability */
export interface Vehicle extends Node {
  name?:
    | string
    | null /* The name of this vehicle. The common name, such as &quot;Sand Crawler&quot; or &quot;Speederbike&quot;. */;
  model?:
    | string
    | null /* The model or official name of this vehicle. Such as &quot;All-Terrain AttackTransport&quot;. */;
  vehicleClass?:
    | string
    | null /* The class of this vehicle, such as &quot;Wheeled&quot; or &quot;Repulsorcraft&quot;. */;
  manufacturers?: string[] | null /* The manufacturers of this vehicle. */;
  costInCredits?: number | null /* The cost of this vehicle new, in Galactic Credits. */;
  length?: number | null /* The length of this vehicle in meters. */;
  crew?: string | null /* The number of personnel needed to run or pilot this vehicle. */;
  passengers?: string | null /* The number of non-essential people this vehicle can transport. */;
  maxAtmospheringSpeed?: number | null /* The maximum speed of this vehicle in atmosphere. */;
  cargoCapacity?: number | null /* The maximum number of kilograms that this vehicle can transport. */;
  consumables?:
    | string
    | null /* The maximum length of time that this vehicle can provide consumables for itsentire crew without having to resupply. */;
  pilotConnection?: VehiclePilotsConnection | null;
  filmConnection?: VehicleFilmsConnection | null;
  created?: string | null /* The ISO 8601 date format of the time that this resource was created. */;
  edited?: string | null /* The ISO 8601 date format of the time that this resource was edited. */;
  id: string /* The ID of an object */;
}
/* A connection to a list of items. */
export interface VehiclePilotsConnection {
  pageInfo: PageInfo /* Information to aid in pagination. */;
  edges?: VehiclePilotsEdge[] | null /* A list of edges. */;
  totalCount?:
    | number
    | null /* A count of the total number of objects in this connection, ignoring pagination.This allows a client to fetch the first five objects by passing &quot;5&quot; as theargument to &quot;first&quot;, then fetch the total count so it could display &quot;5 of 83&quot;,for example. */;
  pilots?:
    | Person[]
    | null /* A list of all of the objects returned in the connection. This is a conveniencefield provided for quickly exploring the API; rather than querying for&quot;{ edges { node } }&quot; when no edge data is needed, this field can be be usedinstead. Note that when clients like Relay need to fetch the &quot;cursor&quot; field onthe edge to enable efficient pagination, this shortcut cannot be used, and thefull &quot;{ edges { node } }&quot; version should be used instead. */;
}
/* An edge in a connection. */
export interface VehiclePilotsEdge {
  node?: Person | null /* The item at the end of the edge */;
  cursor: string /* A cursor for use in pagination */;
}
/* A connection to a list of items. */
export interface VehicleFilmsConnection {
  pageInfo: PageInfo /* Information to aid in pagination. */;
  edges?: VehicleFilmsEdge[] | null /* A list of edges. */;
  totalCount?:
    | number
    | null /* A count of the total number of objects in this connection, ignoring pagination.This allows a client to fetch the first five objects by passing &quot;5&quot; as theargument to &quot;first&quot;, then fetch the total count so it could display &quot;5 of 83&quot;,for example. */;
  films?:
    | Film[]
    | null /* A list of all of the objects returned in the connection. This is a conveniencefield provided for quickly exploring the API; rather than querying for&quot;{ edges { node } }&quot; when no edge data is needed, this field can be be usedinstead. Note that when clients like Relay need to fetch the &quot;cursor&quot; field onthe edge to enable efficient pagination, this shortcut cannot be used, and thefull &quot;{ edges { node } }&quot; version should be used instead. */;
}
/* An edge in a connection. */
export interface VehicleFilmsEdge {
  node?: Film | null /* The item at the end of the edge */;
  cursor: string /* A cursor for use in pagination */;
}
/* A connection to a list of items. */
export interface PlanetFilmsConnection {
  pageInfo: PageInfo /* Information to aid in pagination. */;
  edges?: PlanetFilmsEdge[] | null /* A list of edges. */;
  totalCount?:
    | number
    | null /* A count of the total number of objects in this connection, ignoring pagination.This allows a client to fetch the first five objects by passing &quot;5&quot; as theargument to &quot;first&quot;, then fetch the total count so it could display &quot;5 of 83&quot;,for example. */;
  films?:
    | Film[]
    | null /* A list of all of the objects returned in the connection. This is a conveniencefield provided for quickly exploring the API; rather than querying for&quot;{ edges { node } }&quot; when no edge data is needed, this field can be be usedinstead. Note that when clients like Relay need to fetch the &quot;cursor&quot; field onthe edge to enable efficient pagination, this shortcut cannot be used, and thefull &quot;{ edges { node } }&quot; version should be used instead. */;
}
/* An edge in a connection. */
export interface PlanetFilmsEdge {
  node?: Film | null /* The item at the end of the edge */;
  cursor: string /* A cursor for use in pagination */;
}
/* A connection to a list of items. */
export interface SpeciesPeopleConnection {
  pageInfo: PageInfo /* Information to aid in pagination. */;
  edges?: SpeciesPeopleEdge[] | null /* A list of edges. */;
  totalCount?:
    | number
    | null /* A count of the total number of objects in this connection, ignoring pagination.This allows a client to fetch the first five objects by passing &quot;5&quot; as theargument to &quot;first&quot;, then fetch the total count so it could display &quot;5 of 83&quot;,for example. */;
  people?:
    | Person[]
    | null /* A list of all of the objects returned in the connection. This is a conveniencefield provided for quickly exploring the API; rather than querying for&quot;{ edges { node } }&quot; when no edge data is needed, this field can be be usedinstead. Note that when clients like Relay need to fetch the &quot;cursor&quot; field onthe edge to enable efficient pagination, this shortcut cannot be used, and thefull &quot;{ edges { node } }&quot; version should be used instead. */;
}
/* An edge in a connection. */
export interface SpeciesPeopleEdge {
  node?: Person | null /* The item at the end of the edge */;
  cursor: string /* A cursor for use in pagination */;
}
/* A connection to a list of items. */
export interface SpeciesFilmsConnection {
  pageInfo: PageInfo /* Information to aid in pagination. */;
  edges?: SpeciesFilmsEdge[] | null /* A list of edges. */;
  totalCount?:
    | number
    | null /* A count of the total number of objects in this connection, ignoring pagination.This allows a client to fetch the first five objects by passing &quot;5&quot; as theargument to &quot;first&quot;, then fetch the total count so it could display &quot;5 of 83&quot;,for example. */;
  films?:
    | Film[]
    | null /* A list of all of the objects returned in the connection. This is a conveniencefield provided for quickly exploring the API; rather than querying for&quot;{ edges { node } }&quot; when no edge data is needed, this field can be be usedinstead. Note that when clients like Relay need to fetch the &quot;cursor&quot; field onthe edge to enable efficient pagination, this shortcut cannot be used, and thefull &quot;{ edges { node } }&quot; version should be used instead. */;
}
/* An edge in a connection. */
export interface SpeciesFilmsEdge {
  node?: Film | null /* The item at the end of the edge */;
  cursor: string /* A cursor for use in pagination */;
}
/* A connection to a list of items. */
export interface FilmStarshipsConnection {
  pageInfo: PageInfo /* Information to aid in pagination. */;
  edges?: FilmStarshipsEdge[] | null /* A list of edges. */;
  totalCount?:
    | number
    | null /* A count of the total number of objects in this connection, ignoring pagination.This allows a client to fetch the first five objects by passing &quot;5&quot; as theargument to &quot;first&quot;, then fetch the total count so it could display &quot;5 of 83&quot;,for example. */;
  starships?:
    | Starship[]
    | null /* A list of all of the objects returned in the connection. This is a conveniencefield provided for quickly exploring the API; rather than querying for&quot;{ edges { node } }&quot; when no edge data is needed, this field can be be usedinstead. Note that when clients like Relay need to fetch the &quot;cursor&quot; field onthe edge to enable efficient pagination, this shortcut cannot be used, and thefull &quot;{ edges { node } }&quot; version should be used instead. */;
}
/* An edge in a connection. */
export interface FilmStarshipsEdge {
  node?: Starship | null /* The item at the end of the edge */;
  cursor: string /* A cursor for use in pagination */;
}
/* A connection to a list of items. */
export interface FilmVehiclesConnection {
  pageInfo: PageInfo /* Information to aid in pagination. */;
  edges?: FilmVehiclesEdge[] | null /* A list of edges. */;
  totalCount?:
    | number
    | null /* A count of the total number of objects in this connection, ignoring pagination.This allows a client to fetch the first five objects by passing &quot;5&quot; as theargument to &quot;first&quot;, then fetch the total count so it could display &quot;5 of 83&quot;,for example. */;
  vehicles?:
    | Vehicle[]
    | null /* A list of all of the objects returned in the connection. This is a conveniencefield provided for quickly exploring the API; rather than querying for&quot;{ edges { node } }&quot; when no edge data is needed, this field can be be usedinstead. Note that when clients like Relay need to fetch the &quot;cursor&quot; field onthe edge to enable efficient pagination, this shortcut cannot be used, and thefull &quot;{ edges { node } }&quot; version should be used instead. */;
}
/* An edge in a connection. */
export interface FilmVehiclesEdge {
  node?: Vehicle | null /* The item at the end of the edge */;
  cursor: string /* A cursor for use in pagination */;
}
/* A connection to a list of items. */
export interface FilmCharactersConnection {
  pageInfo: PageInfo /* Information to aid in pagination. */;
  edges?: FilmCharactersEdge[] | null /* A list of edges. */;
  totalCount?:
    | number
    | null /* A count of the total number of objects in this connection, ignoring pagination.This allows a client to fetch the first five objects by passing &quot;5&quot; as theargument to &quot;first&quot;, then fetch the total count so it could display &quot;5 of 83&quot;,for example. */;
  characters?:
    | Person[]
    | null /* A list of all of the objects returned in the connection. This is a conveniencefield provided for quickly exploring the API; rather than querying for&quot;{ edges { node } }&quot; when no edge data is needed, this field can be be usedinstead. Note that when clients like Relay need to fetch the &quot;cursor&quot; field onthe edge to enable efficient pagination, this shortcut cannot be used, and thefull &quot;{ edges { node } }&quot; version should be used instead. */;
}
/* An edge in a connection. */
export interface FilmCharactersEdge {
  node?: Person | null /* The item at the end of the edge */;
  cursor: string /* A cursor for use in pagination */;
}
/* A connection to a list of items. */
export interface FilmPlanetsConnection {
  pageInfo: PageInfo /* Information to aid in pagination. */;
  edges?: FilmPlanetsEdge[] | null /* A list of edges. */;
  totalCount?:
    | number
    | null /* A count of the total number of objects in this connection, ignoring pagination.This allows a client to fetch the first five objects by passing &quot;5&quot; as theargument to &quot;first&quot;, then fetch the total count so it could display &quot;5 of 83&quot;,for example. */;
  planets?:
    | Planet[]
    | null /* A list of all of the objects returned in the connection. This is a conveniencefield provided for quickly exploring the API; rather than querying for&quot;{ edges { node } }&quot; when no edge data is needed, this field can be be usedinstead. Note that when clients like Relay need to fetch the &quot;cursor&quot; field onthe edge to enable efficient pagination, this shortcut cannot be used, and thefull &quot;{ edges { node } }&quot; version should be used instead. */;
}
/* An edge in a connection. */
export interface FilmPlanetsEdge {
  node?: Planet | null /* The item at the end of the edge */;
  cursor: string /* A cursor for use in pagination */;
}
/* A connection to a list of items. */
export interface PeopleConnection {
  pageInfo: PageInfo /* Information to aid in pagination. */;
  edges?: PeopleEdge[] | null /* A list of edges. */;
  totalCount?:
    | number
    | null /* A count of the total number of objects in this connection, ignoring pagination.This allows a client to fetch the first five objects by passing &quot;5&quot; as theargument to &quot;first&quot;, then fetch the total count so it could display &quot;5 of 83&quot;,for example. */;
  people?:
    | Person[]
    | null /* A list of all of the objects returned in the connection. This is a conveniencefield provided for quickly exploring the API; rather than querying for&quot;{ edges { node } }&quot; when no edge data is needed, this field can be be usedinstead. Note that when clients like Relay need to fetch the &quot;cursor&quot; field onthe edge to enable efficient pagination, this shortcut cannot be used, and thefull &quot;{ edges { node } }&quot; version should be used instead. */;
}
/* An edge in a connection. */
export interface PeopleEdge {
  node?: Person | null /* The item at the end of the edge */;
  cursor: string /* A cursor for use in pagination */;
}
/* A connection to a list of items. */
export interface PlanetsConnection {
  pageInfo: PageInfo /* Information to aid in pagination. */;
  edges?: PlanetsEdge[] | null /* A list of edges. */;
  totalCount?:
    | number
    | null /* A count of the total number of objects in this connection, ignoring pagination.This allows a client to fetch the first five objects by passing &quot;5&quot; as theargument to &quot;first&quot;, then fetch the total count so it could display &quot;5 of 83&quot;,for example. */;
  planets?:
    | Planet[]
    | null /* A list of all of the objects returned in the connection. This is a conveniencefield provided for quickly exploring the API; rather than querying for&quot;{ edges { node } }&quot; when no edge data is needed, this field can be be usedinstead. Note that when clients like Relay need to fetch the &quot;cursor&quot; field onthe edge to enable efficient pagination, this shortcut cannot be used, and thefull &quot;{ edges { node } }&quot; version should be used instead. */;
}
/* An edge in a connection. */
export interface PlanetsEdge {
  node?: Planet | null /* The item at the end of the edge */;
  cursor: string /* A cursor for use in pagination */;
}
/* A connection to a list of items. */
export interface SpeciesConnection {
  pageInfo: PageInfo /* Information to aid in pagination. */;
  edges?: SpeciesEdge[] | null /* A list of edges. */;
  totalCount?:
    | number
    | null /* A count of the total number of objects in this connection, ignoring pagination.This allows a client to fetch the first five objects by passing &quot;5&quot; as theargument to &quot;first&quot;, then fetch the total count so it could display &quot;5 of 83&quot;,for example. */;
  species?:
    | Species[]
    | null /* A list of all of the objects returned in the connection. This is a conveniencefield provided for quickly exploring the API; rather than querying for&quot;{ edges { node } }&quot; when no edge data is needed, this field can be be usedinstead. Note that when clients like Relay need to fetch the &quot;cursor&quot; field onthe edge to enable efficient pagination, this shortcut cannot be used, and thefull &quot;{ edges { node } }&quot; version should be used instead. */;
}
/* An edge in a connection. */
export interface SpeciesEdge {
  node?: Species | null /* The item at the end of the edge */;
  cursor: string /* A cursor for use in pagination */;
}
/* A connection to a list of items. */
export interface StarshipsConnection {
  pageInfo: PageInfo /* Information to aid in pagination. */;
  edges?: StarshipsEdge[] | null /* A list of edges. */;
  totalCount?:
    | number
    | null /* A count of the total number of objects in this connection, ignoring pagination.This allows a client to fetch the first five objects by passing &quot;5&quot; as theargument to &quot;first&quot;, then fetch the total count so it could display &quot;5 of 83&quot;,for example. */;
  starships?:
    | Starship[]
    | null /* A list of all of the objects returned in the connection. This is a conveniencefield provided for quickly exploring the API; rather than querying for&quot;{ edges { node } }&quot; when no edge data is needed, this field can be be usedinstead. Note that when clients like Relay need to fetch the &quot;cursor&quot; field onthe edge to enable efficient pagination, this shortcut cannot be used, and thefull &quot;{ edges { node } }&quot; version should be used instead. */;
}
/* An edge in a connection. */
export interface StarshipsEdge {
  node?: Starship | null /* The item at the end of the edge */;
  cursor: string /* A cursor for use in pagination */;
}
/* A connection to a list of items. */
export interface VehiclesConnection {
  pageInfo: PageInfo /* Information to aid in pagination. */;
  edges?: VehiclesEdge[] | null /* A list of edges. */;
  totalCount?:
    | number
    | null /* A count of the total number of objects in this connection, ignoring pagination.This allows a client to fetch the first five objects by passing &quot;5&quot; as theargument to &quot;first&quot;, then fetch the total count so it could display &quot;5 of 83&quot;,for example. */;
  vehicles?:
    | Vehicle[]
    | null /* A list of all of the objects returned in the connection. This is a conveniencefield provided for quickly exploring the API; rather than querying for&quot;{ edges { node } }&quot; when no edge data is needed, this field can be be usedinstead. Note that when clients like Relay need to fetch the &quot;cursor&quot; field onthe edge to enable efficient pagination, this shortcut cannot be used, and thefull &quot;{ edges { node } }&quot; version should be used instead. */;
}
/* An edge in a connection. */
export interface VehiclesEdge {
  node?: Vehicle | null /* The item at the end of the edge */;
  cursor: string /* A cursor for use in pagination */;
}
export interface AllFilmsRootArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface FilmRootArgs {
  id?: string | null;
  filmID?: string | null;
}
export interface AllPeopleRootArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface PersonRootArgs {
  id?: string | null;
  personID?: string | null;
}
export interface AllPlanetsRootArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface PlanetRootArgs {
  id?: string | null;
  planetID?: string | null;
}
export interface AllSpeciesRootArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface SpeciesRootArgs {
  id?: string | null;
  speciesID?: string | null;
}
export interface AllStarshipsRootArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface StarshipRootArgs {
  id?: string | null;
  starshipID?: string | null;
}
export interface AllVehiclesRootArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface VehicleRootArgs {
  id?: string | null;
  vehicleID?: string | null;
}
export interface NodeRootArgs {
  id: string /* The ID of an object */;
}
export interface SpeciesConnectionFilmArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface StarshipConnectionFilmArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface VehicleConnectionFilmArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface CharacterConnectionFilmArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface PlanetConnectionFilmArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface PersonConnectionSpeciesArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface FilmConnectionSpeciesArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface ResidentConnectionPlanetArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface FilmConnectionPlanetArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface FilmConnectionPersonArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface StarshipConnectionPersonArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface VehicleConnectionPersonArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface PilotConnectionStarshipArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface FilmConnectionStarshipArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface PilotConnectionVehicleArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface FilmConnectionVehicleArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
