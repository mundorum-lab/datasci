import { html, Oid, OidUI } from "/lib/oidlib-dev.js";
import {
    getCurve,
    interpolateCubicBezierAngle,
    getCubicBezierSVGPath,
  } from 'proto-arrows'

class ArrowOid extends OidUI {
    /**
     * Represents the arrow in the workflow space.
     * @extends OidUI
     */
    
    template () {
        const positions = [this.x0, this.y0, this.x1, this.y1];

        for (let coord of positions) {
            if (coord == null)
                return html``;
        }

        const curve = getCurve({ x: Number(this.x0), y: Number(this.y0) }, { x: Number(this.x1), y: Number(this.y1) });
        const svgPath = getCubicBezierSVGPath(curve);
        const endAngle = interpolateCubicBezierAngle(curve, 1);

        const minWidth = Math.min(Number(this.x0), Number(this.x1));
        const minHeight = Math.min(Number(this.y0), Number(this.y1));
        const width = Math.max(Number(this.x0), Number(this.x1));
        const height = Math.max(Number(this.y0), Number(this.y1));

        return html`
        <svg class="absolute z-50"
        viewBox="${minWidth} ${minHeight} ${width} ${height}"
        stroke="#000"
        fill="#000"
        strokeWidth="3"
        >
            <circle cx="${curve.start.x}" cy="${curve.start.y}" r="${4}" />
            <path d="${svgPath}" fill="none" />
            <polygon
                points="0,-6 12,0, 0,6"
                transform="translate(${curve.end.x},${curve.end.y}) rotate(${endAngle})"
            />
        </svg>
        `;
    }
}

Oid.component(
    {
        id:'wf:arrow-oid',
        element:'arrow-oid',
        properties: {
            x0: {default: null},
            y0: {default: null},
            x1: {default: null},
            y1: {default: null},
        },
        implementation: ArrowOid,
        stylesheet: ["/style.css"],
    }
)

export { ArrowOid };
