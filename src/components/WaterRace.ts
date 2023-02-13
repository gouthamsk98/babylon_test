import {
  CubeTexture,
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  PBRMaterial,
  Scene,
  SceneLoader,
  Texture,
  Vector3,
  Vector2,
  ArcRotateCamera,
  Color3,
  StandardMaterial,
  HDRCubeTexture,
  CannonJSPlugin,
  PhysicsImpostor,
} from "@babylonjs/core";
import "@babylonjs/loaders";
import * as CANNON from "cannon";
import { WaterMaterial } from "@babylonjs/materials";
export class WaterRace {
  scene: Scene;
  engine: Engine;
  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();
    this.createController();
    this.CreateImpostors();
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  createController(): void {
    // const camera = new ArcRotateCamera(
    //   "Camera",
    //   (3 * Math.PI) / 2,
    //   Math.PI / 4,
    //   100,
    //   Vector3.Zero(),
    //   this.scene
    // );
    const camera = new FreeCamera("camera", new Vector3(0, 30, -5), this.scene);

    camera.attachControl();
    camera.speed = 1.4;
    camera.applyGravity = true;
    camera.checkCollisions = true;
    camera.ellipsoid = new Vector3(1, 1, 1);
    camera.minZ = 0.65;
    camera.angularSensibility = 3000;
    camera.keysUp.push(87);
    camera.keysLeft.push(65);
    camera.keysDown.push(83);
    camera.keysRight.push(68);
  }
  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    scene.onPointerDown = (e) => {
      if (e.button == 0) this.engine.enterPointerlock();
      if (e.button == 1) this.engine.exitPointerlock();
    };
    scene.enablePhysics(
      new Vector3(0, -9.81, 0),
      new CannonJSPlugin(true, 10, CANNON)
    );
    const framesPerSeconds = 60;
    const gravity = -9.81;
    scene.gravity = new Vector3(0, gravity / framesPerSeconds, 0);
    scene.collisionsEnabled = true;

    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensityMode;
    const envTex = CubeTexture.CreateFromPrefilteredData(
      "./env/sky.env",
      scene
    );

    const sky = scene.createDefaultSkybox(envTex, true);
    sky.infiniteDistance = true;
    var waterMesh = MeshBuilder.CreateGround(
      "waterMesh",
      { width: 5000, height: 5000, subdivisions: 25, updatable: true },
      scene
    );
    var water = new WaterMaterial("water", scene, new Vector2(500, 500));
    water.backFaceCulling = true;
    water.bumpTexture = new Texture("textures/waterbump.png", scene);
    water.windForce = 20;
    water.waveHeight = 1.7;
    water.bumpHeight = 0.8;
    water.windDirection = new Vector2(1, 1);
    water.waterColor = new Color3(0, 0, 221 / 255);
    water.colorBlendFactor = 0;
    water.addToRenderList(sky);
    waterMesh.material = water;
    waterMesh.checkCollisions = true;

    return scene;
  }
  CreateImpostors(): void {
    const ground = MeshBuilder.CreateGround("ground", {
      width: 5000,
      height: 5000,
    });

    ground.isVisible = false;
    ground.position = new Vector3(0, 25, 0);
    ground.physicsImpostor = new PhysicsImpostor(
      ground,
      PhysicsImpostor.BoxImpostor,
      { mass: 0, restitution: 0.5 }
    );
    ground.checkCollisions = true;
  }
}
