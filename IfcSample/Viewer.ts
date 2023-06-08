import { AmbientLight, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import {
    OrbitControls
} from "three/examples/jsm/controls/OrbitControls";
import { IFCLoader } from "web-ifc-three";

export class Viewer
{
    public constructor()
    {
        this.Initialize();
    }

    private async Initialize()
    {
        const scene = new Scene();

        const size = {width: window.innerWidth, height: window.innerHeight};

        const aspect = size.width / size.height;
        const camera = new PerspectiveCamera(75, aspect);

        const lightColor = 0xffffff;

        const ambientLight = new AmbientLight(lightColor, 0.5);
        scene.add(ambientLight);

        const directionalLight = new DirectionalLight(lightColor, 1);
        directionalLight.position.set(0, 10, 0);
        directionalLight.target.position.set(-5, 0, 0);
        scene.add(directionalLight);
        scene.add(directionalLight.target);

        const threeCanvas = document.getElementById("three-canvas") as HTMLElement;
        const renderer = new WebGLRenderer({
            canvas: threeCanvas as HTMLCanvasElement,
            alpha: true,
        });

        renderer.setSize(size.width, size.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const controls = new OrbitControls(camera, threeCanvas as HTMLElement);
        controls.enableDamping = true;
        controls.target.set(-2, 0, 0);

        const animate = () => 
        {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        const ifcLoader = new IFCLoader();
        const ifcModels: any[] = [];

        ifcLoader.ifcManager.setWasmPath("../web-ifc-wasm/");

        ifcLoader.load("ifc/test.ifc", (ifcModel) => 
        {
            scene.add(ifcModel);
            ifcModels.push(ifcModel);
        });   

          ifcLoader.ifcManager.parser.setupOptionalCategories({});
    }
}