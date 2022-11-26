import {
  CubeTexture,
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  PBRMaterial,
  Scene,
  Texture,
  Vector3,
} from "@babylonjs/core";
import diffuse from "../assets/textures/ground/cobblestone_floor_08_diff_1k.jpg";
import normal from "../assets/textures/ground/cobblestone_floor_08_nor_gl_1k.jpg";
import ao from "../assets/textures/ground/cobblestone_floor_08_ao_1k.jpg";
import spec from "../assets/textures/ground/cobblestone_floor_08_disp_1k.jpg";
import ao_ball from "../assets/textures/metal/metal_ao.jpg";
import diffuse_ball from "../assets/textures/metal/metal_diffuse.jpg";
import normal_ball from "../assets/textures/metal/metal_normal.jpg";
import spec_ball from "../assets/textures/metal/metal_spec.jpg";
export class PBR {
  scene: Scene;
  engine: Engine;
  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();
    this.createEnvironmant();
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
      new Vector3(0, 1, 0),
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
    const ball = MeshBuilder.CreateSphere("ball", { diameter: 1 }, this.scene);
    ball.position = new Vector3(0, 1, 0);
    ground.material = this.createAsphalt();
    ball.material = this.createMagic();
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
  createMagic(): PBRMaterial {
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
}
