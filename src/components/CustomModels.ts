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
} from "@babylonjs/core";
import "@babylonjs/loaders";
export class CustomModels {
  scene: Scene;
  engine: Engine;
  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();
    // this.createEnvironmant();
    // this.createBarrel();
    this.createCampFire();
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl();
    camera.speed = 0.25;
    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, -8),
      this.scene
    );
    hemiLight.intensity = 0;
    const envTex = CubeTexture.CreateFromPrefilteredData(
      "./env/environment.env",
      scene
    );
    scene.environmentTexture = envTex;
    scene.createDefaultSkybox(envTex, true);
    scene.environmentIntensity = 0.75;

    return scene;
  }
  createEnvironmant(): void {
    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 10, height: 10 },
      this.scene
    );

    ground.material = this.createAsphalt();
  }
  createAsphalt(): PBRMaterial {
    const pbr = new PBRMaterial("pbr", this.scene);
    pbr.albedoTexture = new Texture(
      "./textures/street/asphalt_02_diff_1k.jpg",
      this.scene
    );
    pbr.bumpTexture = new Texture(
      "./textures/street/asphalt_02_nor_gl_1k.jpg",
      this.scene
    );
    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY = true;
    pbr.useAmbientOcclusionFromMetallicTextureRed = true;
    pbr.useRoughnessFromMetallicTextureGreen = true;
    pbr.useMetallnessFromMetallicTextureBlue = true;
    pbr.metallicTexture = new Texture(
      "./textures/street/asphalt_02_arm_1k.jpg",
      this.scene
    );

    return pbr;
  }
  async createBarrel(): Promise<void> {
    // SceneLoader.ImportMesh(
    //   "",
    //   "./models/",
    //   "Barrel.glb",
    //   this.scene,
    //   (meshes) => {
    //     console.log("meshes", meshes);
    //   }
    // );
    const { meshes } = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "barrel.glb"
    );
    console.log("meshes=", meshes);
  }
  async createCampFire(): Promise<void> {
    const models = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "campfire.glb"
    );
    console.log("meshes=", models);
  }
}
