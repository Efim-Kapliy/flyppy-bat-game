import { _decorator, Component, Node, input, Input, RigidBody2D, Vec2, Prefab, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
  @property(Node)
  player: Node;

  @property(Prefab)
  topObstacle: Prefab;

  @property(Prefab)
  bottomObstacle: Prefab;

  start() {
    input.on(Input.EventType.TOUCH_START, this.jump, this);
  }

  private jump() {
    let body: RigidBody2D = this.player.getComponent(RigidBody2D);
    body.linearVelocity = new Vec2(0, 0);
    body.applyLinearImpulseToCenter(new Vec2(0, 700), true);
  }

  update(deltaTime: number) {}
}
