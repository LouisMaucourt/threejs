uniform float ratio;
uniform float time;
uniform float opacity; 

varying vec2 vUv;

#define PI2 6.28318530718
#define PI 3.1416

float vorocloud(vec2 p, float time) {
    float f = 0.0;
    vec2 pp = cos(vec2(p.x * 14.0, (16.0 * p.y + cos(floor(p.x * 30.0)) + time * PI2)) );
    p = cos(p * 12.1 + pp * 10.0 + 0.5 * cos(pp.x * 10.0));

    vec2 pts[4];
    pts[0] = vec2(0.5, 0.6);
    pts[1] = vec2(-0.4, 0.4);
    pts[2] = vec2(0.2, -0.7);
    pts[3] = vec2(-0.3, -0.4);
    
    float d = 5.0;
    
    for(int i = 0; i < 4; i++) {
        pts[i].x += 0.03 * cos(float(i)) + p.x;
        pts[i].y += 0.03 * sin(float(i)) + p.y;
        d = min(d, distance(pts[i], pp));
    }
    
    f = 2.0 * pow(1.0 - 0.3 * d, 13.0);
    f = min(f, 1.0);
    
    return f;
}

void main() {
    vec2 uv = vUv;
    
    float cloud = vorocloud(uv, time);
    vec3 color = vec3(cloud * ratio, cloud * 0.5, cloud * 0.8);
    gl_FragColor = vec4(color * opacity, opacity);
}
