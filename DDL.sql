create table Users(
`UserId` int(100) not null primary key,
`Name` varchar(100) not null,
`Age` int(50) not null,
`Weight` int(50) not null,
`Email` varchar(100) not null unique,
`PhoneNumber` int(15) not null unique,
`Password` varchar(50) not null,
`Dojo` int(10) not null,
`Points` int(100) default 0,
`Belt` int(10),
`EventCount` int(10) default 0,
`MedalsWon` int(10) default 0,
`Admin` int(1) default 0,
`Role` int(10) default 1,
`Ecash` int(100) default 0,
`BlockFlag` int(1) default 0,
Foreign Key (Role) references Roles(RoleId),
Foreign Key(Dojo) references Dojo(DojoId),
Foreign Key(Belt) references Belt(BeltId)
);

create table Roles(
`RoleId` int(100) not null primary key,
`Role` varchar(100) not null unique
);

create table Dojo(
`DojoId` int(50) not null primary key,
`Dojo` varchar(50) not null,
`City` int(10) not null
);

create table Belt(
`BeltId` int(50) not null primary key,
`Belt` varchar(50) not null
);


create table UserEventMap(
`MapId` int (50) not null primary key,
`UserId` int(50) not null,
`EventId` int(50) not null,
Foreign key (UserId) references Users(UserId),
Foreign key (EventId) references Events(EventId)
);

create table Events (
`EventId` int(50) not null primary key,
`Division` int (50) not null,
`Category` int(50) not null,
`EventName` varchar (100) not null,
Foreign Key (Division) references Divisions(DivisionId),
Foreign Key (Category) references Categories(CategoryId)
);

create table Divisions(
`DivisionId` int(50) not null primary key,
`Name` varchar(100) not null
);

create table Categories(
`CategoryId` int(50) not null primary key,
`Category` varchar(100) not null
);

create table EventResults(
`ResultId` int(50) not null primary key,
`Winner` int(50) not null,
`Runner` int(50) not null,
`SRunner` int(50) not null,
`Status` int(10) not null,
Foreign Key (Status) references EventStatus(StatusId)
);

create table EventStatus(
`StatusId` int(10) not null primary key,
`Status` varchar(50) not null unique
);

create table Fixtures(
`FixtureId` int(255) not null primary key,
`EventId` int(50) not null,
`Color` int(10) not null,
`RoundNumber` int(50) not null default 1,
`FixtureWinner` int(100) not null,
`FixtureLoser` int(100) not null,
Foreign Key (FixtureWinner) references Users(UserId),
Foreign Key (FixtureLoser) references Users(UserId),
Foreign Key (Color) references Colors(ColorId)
);

create table Colors(
`ColorId` int(5) not null primary key,
`Color` varchar(10) not null
);

create table RoundWinners(
`Id` int(255) not null primary key,
`Event` int(50) not null,
`AdvRound` int(100) not null,
`RoundType` int(50) not null,
`Winner` int(100) not null,
Foreign Key (Event) references Events(EventId),
Foreign Key (RoundType) references RoundTypes(TypeId),
Foreign Key (Winner) references Users(UserId)
);

create table RoundTypes(
`TypeId` int(50) not null primary key,
`Type` varchar(100) not null unique
);

create table Registrations(
`RegId` int(255) not null primary key,
`Event` int(50) not null,
`UserId` int(100) not null,
Foreign Key (Event) references Events(EventId),
Foreign Key (UserId) references Users(UserId)
);


create table UserTokenMap(
`Email` varchar(100) not null primary key,
`Token` varchar(100) not null
);
