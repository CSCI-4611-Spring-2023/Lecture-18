/* Lecture 18
 * CSCI 4611, Spring 2023, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'

export class SpriteCharacter extends gfx.Mesh
{
    private spriteMaterial: gfx.UnlitMaterial;
    private fps: number;

    private rightWalkTextures: gfx.Texture[];
    private frontWalkTextures: gfx.Texture[];
    private backWalkTextures: gfx.Texture[];

    constructor(width: number, height: number, fps: number)
    {
        super();

        this.fps = fps;

        const vertices: number[] = [];
        vertices.push(-width/2, -height/2, 0);
        vertices.push(width/2, -height/2, 0);
        vertices.push(width/2, height/2, 0);
        vertices.push(-width/2, height/2,0);

        const normals: number[] = [];
        normals.push(0, 0, -1);
        normals.push(0, 0, -1);
        normals.push(0, 0, -1);
        normals.push(0, 0, -1);
        
        const indices: number[] = [];
        indices.push(0, 2, 1);
        indices.push(2, 0, 3);

        const uvs: number[] = [];
        uvs.push(1, 1);
        uvs.push(0, 1);
        uvs.push(0, 0);
        uvs.push(1, 0);

        this.setVertices(vertices);
        this.setNormals(normals);
        this.setIndices(indices);
        this.setTextureCoordinates(uvs);
        this.createDefaultVertexColors();

        this.spriteMaterial = new gfx.UnlitMaterial();
        this.material = this.spriteMaterial;

        this.frontWalkTextures = [];
        for(let i=0; i < this.fps; i++)
        {
            if(i < 10)
                this.frontWalkTextures[i] = new gfx.Texture('./assets/sprites/HumanoidCharacter-Front-walk_0' + i + '.png');
            else
                this.frontWalkTextures[i] = new gfx.Texture('./assets/sprites/HumanoidCharacter-Front-walk_' + i + '.png');
        }

        this.backWalkTextures = [];
        for(let i=0; i < this.fps; i++)
        {
            if(i < 10)
                this.backWalkTextures[i] = new gfx.Texture('./assets/sprites/HumanoidCharacter-Back-walk_0' + i + '.png');
            else
                this.backWalkTextures[i] = new gfx.Texture('./assets/sprites/HumanoidCharacter-Back-walk_' + i + '.png');
        }

        this.rightWalkTextures = [];
        for(let i=0; i < this.fps; i++)
        {
            if(i < 10)
                this.rightWalkTextures[i] = new gfx.Texture('./assets/sprites/HumanoidCharacter-Right-walk_0' + i + '.png');
            else
                this.rightWalkTextures[i] = new gfx.Texture('./assets/sprites/HumanoidCharacter-Right-walk_' + i + '.png');
        }

        this.spriteMaterial.texture = this.frontWalkTextures[0];
    }

    update(): void
    {
        const camera = gfx.GfxApp.getInstance().camera;
        this.lookAt(camera.position);
    }
}