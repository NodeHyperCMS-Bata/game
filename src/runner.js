/**
 * Runner.ts - 간단한 러너 라이브러리
 * @copyright 2024 urobot2011 https://github.com/urobot2011
 * @license MIT
 */

export class Runner {
    /**
     * 실행 주기를 카운트하는 tick 변수입니다.
     * @public
     * @type {number}
     */
    tick = 0;

    /**
     * 실행 상태를 나타내는 변수입니다. true면 실행 중, false면 중지 상태입니다.
     * @public
     * @type {boolean}
     */
    state = false;

    /**
     * 실행될 콜백 함수들을 저장하는 배열입니다.
     * @public
     * @type {((...args: any[]) => any)[]}
     */
    callbacks = [];

    constructor() {}

    /**
     * 콜백 함수를 배열에 추가합니다.
     * @public
     * @param {((...args: any[]) => any)} callback
     * @returns {this}
     */
    add(callback) {
        this.callbacks.push(callback);
        return this;
    }

    /**
     * tick 변수를 0으로 리셋합니다.
     * @public
     * @returns {this}
     */
    reset() {
        this.tick = 0;
        return this;
    }

    /**
     * 콜백 함수 배열을 비웁니다.
     * @public
     * @returns {this}
     */
    clear() {
        this.callbacks = [];
        return this;
    }

    /**
     * @private
     */
    update() {
        if (!this.state) return;

        for (const callback of this.callbacks) callback(this.tick);

        this.tick++;

        requestAnimationFrame(this.update.bind(this));
    }

    /**
     * 콜백 함수를 주기적으로 실행합니다.
     * @public
     * @returns {this}
     */
    start() {
        if (this.state) return this;

        this.state = true;
        this.update();

        return this;
    }

    /**
     * 실행을 중지합니다.
     * @public
     * @returns {this}
     */
    stop() {
        this.state = false;

        return this;
    }
}
