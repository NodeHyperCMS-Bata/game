/**
 * Vector.ts - 간단한 벡터 라이브러리
 * @copyright 2024 urobot2011 https://github.com/urobot2011
 * @license MIT
 */

export class Vector {
    /**
     * x 좌표
     * @public
     * @type {number}
     */
    x = 0;

    /**
     * y 좌표
     * @public
     * @type {number}
     */
    y = 0;

    /**
     * 생성자: x와 y 값을 받아 벡터를 초기화합니다.
     * @public
     * @param {number | VectorLike} x
     * @param {number} y
     */
    constructor(x = 0, y = 0) {
        if (typeof x === 'number') {
            this.x = x;
            this.y = y;
        } else {
            this.x = x.x;
            this.y = x.y;
        }
    }

    /**
     * 주어진 벡터를 현재 벡터에 더합니다.
     * @public
     * @param {number | VectorLike} vector
     * @returns {this}
     */
    add(vector) {
        if (typeof vector === 'number') {
            this.x += vector;
            this.y += vector;
        } else {
            this.x += vector.x;
            this.y += vector.y;
        }

        return this;
    }

    /**
     * 주어진 벡터를 현재 벡터에서 뺍니다.
     * @public
     * @param {number | VectorLike} vector
     * @returns {this}
     */
    sub(vector) {
        if (typeof vector === 'number') {
            this.x -= vector;
            this.y -= vector;
        } else {
            this.x -= vector.x;
            this.y -= vector.y;
        }

        return this;
    }

    /**
     * 벡터의 길이를 계산하여 반환합니다.
     * @public
     * @returns {number}
     */
    get mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * 벡터를 주어진 숫자 또는 벡터와 곱합니다.
     * @public
     * @param {number | VectorLike} num
     * @returns {this}
     */
    mult(num) {
        if (typeof num === 'number') {
            this.x *= num;
            this.y *= num;
        } else {
            this.x *= num.x;
            this.y *= num.y;
        }

        return this;
    }

    /**
     * 벡터를 주어진 숫자 또는 벡터로 나눕니다.
     * @public
     * @param {number | VectorLike} num
     * @returns {this}
     */
    div(num) {
        if (typeof num === 'number') {
            this.x /= num;
            this.y /= num;
        } else {
            this.x /= num.x;
            this.y /= num.y;
        }

        return this;
    }

    /**
     * 벡터의 방향만 남기고 길이를 1로 만듭니다.
     * @public
     * @returns {this}
     */
    normalize() {
        const mag = this.mag;

        if (mag !== 0) {
            this.div(mag);
        }

        return this;
    }

    /**
     * 두 벡터의 내적을 계산하여 반환합니다.
     * @public
     * @param {VectorLike} vector
     * @returns {number}
     */
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    /**
     * 주어진 각도를 벡터에 추가합니다.
     * @public
     * @param {number} angle (radian)
     * @returns {this}
     */
    addAngle(angle) {
        this.mult({x: Math.cos(angle), y: Math.sin(angle)});

        return this;
    }

    /**
     * 두 벡터 사이의 각도를 계산하여 반환합니다.
     * @public
     * @param {VectorLike} vector
     * @returns {number}
     */
    angleBetween(vector) {
        const dot = this.dot(vector);
        const mags = this.mag * new Vector(vector).mag;

        if (mags === 0) return 0;

        return Math.acos(dot / mags);
    }

    /**
     * 주어진 벡터와의 각도를 반환합니다.
     * @public
     * @param {VectorLike} [vector=new Vector()]
     * @returns {number}
     */
    angle(vector = new Vector()) {
        return Math.atan2(this.y - vector.y, this.x - vector.x);
    }

    /**
     * 벡터의 크기를 주어진 최대값으로 제한합니다.
     * @public
     * @param {number} max
     * @returns {this}
     */
    limit(max) {
        if (this.mag > max) {
            this.normalize();
            this.mult(max);
        }

        return this;
    }

    /**
     * 벡터의 길이를 설정합니다.
     * @public
     * @param {number} newMag
     * @returns {this}
     */
    setMag(newMag) {
        this.normalize();
        this.mult(newMag);

        return this;
    }

    /**
     * 현재 벡터의 복사본을 반환합니다.
     * @public
     * @returns {Vector}
     */
    get clone() {
        return new Vector(this);
    }

    /**
     * 현재 벡터를 문자열로 변환합니다.
     * @public
     * @returns {string}
     */
    toString() {
        return `{x: ${this.x}, y: ${this.y}}`;
    }

    /**
     * 극좌표를 카르테시안 좌표로 변환합니다.
     * @static
     * @param {number} r
     * @param {number} theta
     * @returns {Vector}
     */
    static toCartesian(r, theta) {
        return new Vector(r * Math.cos(theta), r * Math.sin(theta));
    }

    /**
     * 주어진 벡터에 각도를 더한 새로운 벡터를 반환합니다.
     * @static
     * @param {VectorLike} v
     * @param {number} angle (radian)
     * @returns {Vector}
     */
    static addAngle(v, angle) {
        return new Vector(v.x * Math.cos(angle), v.y * Math.sin(angle));
    }

    /**
     * 두 벡터 간의 거리를 계산하여 반환합니다.
     * @static
     * @param {VectorLike} a
     * @param {VectorLike} b
     * @returns {number}
     */
    static distance(a, b) {
        return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
    }

    /**
     * 두 벡터를 더한 결과를 반환합니다.
     * @static
     * @param {VectorLike} a
     * @param {VectorLike} b
     * @returns {Vector}
     */
    static add(a, b) {
        return new Vector(a.x + b.x, a.y + b.y);
    }

    /**
     * 두 벡터를 뺀 결과를 반환합니다.
     * @static
     * @param {VectorLike} a
     * @param {VectorLike} b
     * @returns {Vector}
     */
    static sub(a, b) {
        return new Vector(a.x - b.x, a.y - b.y);
    }

    /**
     * 벡터를 주어진 숫자와 곱한 결과를 반환합니다.
     * @static
     * @param {VectorLike} v
     * @param {number} num
     * @returns {Vector}
     */
    static mult(v, num) {
        return new Vector(v.x * num, v.y * num);
    }

    /**
     * 벡터를 주어진 숫자로 나눈 결과를 반환합니다.
     * @static
     * @param {VectorLike} v
     * @param {number} num
     * @returns {Vector}
     */
    static div(v, num) {
        return new Vector(v.x / num, v.y / num);
    }

    /**
     * 두 벡터의 내적을 계산하여 반환합니다.
     * @static
     * @param {VectorLike} a
     * @param {VectorLike} b
     * @returns {number}
     */
    static dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }

    /**
     * 주어진 벡터의 크기를 계산하여 반환합니다.
     * @static
     * @param {VectorLike} v
     * @returns {number}
     */
    static mag(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }
}

/**
 * @typedef {Object} VectorLike
 * @property {number} x - x 좌표
 * @property {number} y - y 좌표
 */
