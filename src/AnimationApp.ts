/* Lecture 17
 * CSCI 4611, Spring 2023, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'
import { SpriteCharacter } from './SpriteCharacter';

export class AnimationApp extends gfx.GfxApp
{
    private character: SpriteCharacter;
    private cameraControls: gfx.OrbitControls;

    constructor()
    {
        super();

        this.cameraControls = new gfx.OrbitControls(this.camera);
        this.character = new SpriteCharacter(1, 1, 30);
    }

    createScene(): void 
    {
        // Setup camera
        this.camera.setPerspectiveCamera(60, 1920/1080, 1, 800);
        this.cameraControls.setTargetPoint(new gfx.Vector3(0, 0, 0));
        this.cameraControls.setOrbit(gfx.MathUtils.degreesToRadians(-22.5), 0);
        this.cameraControls.rotationSpeedX = 0;
        this.cameraControls.setDistance(25);

        // Set a black background
        this.renderer.background.set(0, 0, 0);
        
        // Create an ambient light
        const ambientLight = new gfx.AmbientLight(new gfx.Vector3(0.6, 0.6, 0.6));
        this.scene.add(ambientLight);

        // Create a directional light
        const directionalLight = new gfx.DirectionalLight(new gfx.Vector3(0.6, 0.6, 0.6));
        directionalLight.position.set(1, 1, 1)
        this.scene.add(directionalLight);

        // Create a sky sphere
        const sky = gfx.MeshFactory.createSphere(400, 1);
        sky.material = new gfx.UnlitMaterial();
        sky.material.setColor(new gfx.Color(0.698, 1, 1));
        sky.material.side = gfx.Side.BACK;
        this.scene.add(sky);

        const rpgMaterial = new gfx.GouraudMaterial();
        rpgMaterial.texture = new gfx.Texture('./assets/textures/rpgpp_lt_tex_a.png');

        const terrain = gfx.ObjLoader.load('./assets/meshes/terrain.obj');
        terrain.material = rpgMaterial;
        this.scene.add(terrain);

        const buildings1 = gfx.ObjLoader.load('./assets/meshes/buildings1.obj');
        buildings1.material = rpgMaterial;
        this.scene.add(buildings1);

        const buildings2 = gfx.ObjLoader.load('./assets/meshes/buildings2.obj');
        buildings2.material = rpgMaterial;
        this.scene.add(buildings2);

        const path = gfx.ObjLoader.load('./assets/meshes/path.obj');
        path.material = rpgMaterial;
        this.scene.add(path);

        const props = gfx.ObjLoader.load('./assets/meshes/props.obj');
        props.material = rpgMaterial;
        this.scene.add(props);

        const rocks = gfx.ObjLoader.load('./assets/meshes/rocks.obj');
        rocks.material = rpgMaterial;
        this.scene.add(rocks);

        const vegetation = gfx.ObjLoader.load('./assets/meshes/vegetation.obj');
        vegetation.material = rpgMaterial;
        this.scene.add(vegetation);

        this.scene.add(this.character);
    }

    update(deltaTime: number): void 
    {
        // Update the camera orbit controls
        this.cameraControls.update(deltaTime);
    }
}