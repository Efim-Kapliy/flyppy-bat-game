import { _decorator, Component, director, input, Input, instantiate, Node, Prefab, RigidBody2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
  @property(Node)
  player: Node;

  @property(Prefab)
  topObstacle: Prefab;

  @property(Prefab)
  bottomObstacle: Prefab;

  isGameStarted: boolean = false;

  start() {
    input.on(Input.EventType.TOUCH_START, this.jump, this);
  }

  private jump() {
    let body: RigidBody2D = this.player.getComponent(RigidBody2D);
    body.linearVelocity = new Vec2(0, 0);
    body.applyLinearImpulseToCenter(new Vec2(0, 700), true);

    if (!this.isGameStarted) {
      this.schedule(() => this.generateObstacles(), 0.8);
      this.isGameStarted = true;
    }
  }

  private generateObstacles() {
    let canvas = director.getScene().getChildByName('Canvas');

    let speed: number = 25;

    let topObstacle = instantiate(this.topObstacle);
    topObstacle.setParent(canvas);
    topObstacle.setPosition(550, 750);
    topObstacle.setSiblingIndex(3);
    topObstacle.getComponent(RigidBody2D).linearVelocity = new Vec2(-speed, 0);

    let bottomObstacle = instantiate(this.bottomObstacle);
    bottomObstacle.setParent(canvas);
    bottomObstacle.setPosition(550, -750);
    bottomObstacle.setSiblingIndex(3);
    bottomObstacle.getComponent(RigidBody2D).linearVelocity = new Vec2(-speed, 0);

    this.scheduleOnce(() => {
      topObstacle.destroy();
      bottomObstacle.destroy();
    }, 2);
  }

  update(deltaTime: number) {}
}
