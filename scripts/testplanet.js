//Test planet 1

const generator = extend(SerpuloPlanetGenerator, {});
generator.dec = ObjectMap.of(Blocks.grass, Blocks.dirt, Blocks.grass, Blocks.dirt, Blocks.water, Blocks.water, Blocks.darksandWater, Blocks.darksandWater);
generator.tars = ObjectMap.of(Blocks.grass, Blocks.shale, Blocks.dirt, Blocks.shale);

const testplanet = new JavaAdapter(Planet, {}, "tesplanet", Planets.serpulo, 4, 0.7); //4,0.7
testplanet.localizedName = "Whitelloy moon";
testplanet.orbitRadius = 4.0;
testplanet.meshLoader = () => new SunMesh(testplanet, 4, 5, 0.3, 1.1, 1, 0.5, 1.5, Color.valueOf("f5d300"), Color.valueOf("74737a"), Color.valueOf("00aSe3"));
testplanet.accessible = true;
testplanet.hasAtmosphere = true;
testplanet.generator = generator;
testplanet.bloom = false;
testplanet.radius = 0.4;
testplanet.hasAtmosphere = true;
testplanet.atmosphereColor = Color.valueOf("80ff00");
testplanet.atmosphereRadIn = 0.01;
testplanet.atmosphereRadOut = 0.1;

//Planet sector pressets
const zonetest1 = new JavaAdapter(SectorPreset, {}, "zonetest1", Planets.testplanet, 1);
zonetest1.difficulty = 12;
zonetest1.captureWave = 15;
zonetest1.localizedName = "First base";
zonetest1.alwaysUnlocked = false;
/*zonetest1.objectives = Seq.with(
  new Objectives.SectorComplete(SectorPresets.groundZero),
  new Objectives.Research(Vars.content.getByName(ContentType.block, "V6AdventureU-0001-ironite-compress")),
  //new Objectives.Research(Vars.content.getByName(ContentType.block, "goldmod-goldForge")),
  //new Objectives.Research(Blocks.laserDrill)
);*/

//zones
const zone1 = Vars.content.getByName(ContentType.sector, "V6AdventureU-zonetest1");
//loads add techs
load(){
   newNode(zone1, groundZero, null, Seq.with(new Objectives.SectorComplete(SectorPresets.groundZero), new Objectives.Research(Blocks.launchPad)));
}

function newNode(content, parentName, req, objectives){
  var parent = TechTree.all.find(t => t.content.name.equals(parentName));

  var node = new TechTree.TechNode(parent, content, req);
  node.objectives.add(objectives);
  
  parent.children.add(node);
}

