document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("animation-container");

    // Three.js sahnasi
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Yulduzlar uchun zarrachalar tizimi (particle system)
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });

    const starVertices = [];
    for (let i = 0; i < 15000; i++) {
        const x = (Math.random() - 0.5) * 50;
        const y = (Math.random() - 0.5) * 50;
        const z = (Math.random() - 0.5) * 50;
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Spiral ko'rinishidagi zarrachalar tizimi
    const spiralGeometry = new THREE.BufferGeometry();
    const spiralMaterial = new THREE.PointsMaterial({ color: 0xffaa00, size: 0.1 });

    const spiralVertices = [];
    const numSpiralStars = 10000;
    for (let i = 0; i < numSpiralStars; i++) {
        const angle = i * 0.1;
        const radius = 5 * Math.sqrt(i);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        const z = (Math.random() - 0.5) * 200;
        spiralVertices.push(x, y, z);
    }

    spiralGeometry.setAttribute('position', new THREE.Float32BufferAttribute(spiralVertices, 3));
    const spiral = new THREE.Points(spiralGeometry, spiralMaterial);
    scene.add(spiral);

    // Kattaroq ko'pburchak shakl yaratish
    const polyGeometry = new THREE.TetrahedronGeometry(10, 0);
    const polyMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const polyhedron = new THREE.Mesh(polyGeometry, polyMaterial);
    polyhedron.position.set(0, 0, -50);
    scene.add(polyhedron);

    // Yorug'lik qo'shish
    const light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(0, 50, 50);
    scene.add(light);

    camera.position.z = 400;

    // Nuqtalar orasidagi chiziqlar
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const drawLines = () => {
        const positions = starGeometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            for (let j = i + 3; j < positions.length; j += 3) {
                const dx = positions[i] - positions[j];
                const dy = positions[i + 1] - positions[j + 1];
                const dz = positions[i + 2] - positions[j + 2];
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (distance < 40) {
                    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                        new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]),
                        new THREE.Vector3(positions[j], positions[j + 1], positions[j + 2])
                    ]);
                    const line = new THREE.Line(lineGeometry, lineMaterial);
                    scene.add(line);
                }
            }
        }
    };

    function animate() {
        requestAnimationFrame(animate);

        // Yulduzlar va spirallar harakati
        stars.rotation.y += 0.0005;
        spiral.rotation.y += 0.001;
        polyhedron.rotation.x += 0.01;
        polyhedron.rotation.y += 0.01;

        // Nuqtalar orasidagi chiziqlarni qayta chizish
        drawLines();

        renderer.render(scene, camera);
    }

    animate();

    // Ekran o'lchamlari o'zgarganda renderer va kamera yangilash
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
