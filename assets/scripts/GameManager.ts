import { _decorator, Component, Node, input, Input, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
  @property(Node)
  player: Node;

  start() {
    input.on(Input.EventType.TOUCH_START, this.jump, this);
  }

  private jump() {}

  update(deltaTime: number) {}
}
