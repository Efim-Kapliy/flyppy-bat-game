import {
  _decorator,
  Component,
  director,
  input,
  Input,
  instantiate,
  Node,
  Prefab,
  RigidBody2D,
  Vec2,
  Collider2D,
  Contact2DType,
  Label,
} from 'cc';
const { ccclass, property } = _decorator;

type MainPrefabsSpeedType = number;
type AddSensorType = {
  prefab: Prefab;
  speed: MainPrefabsSpeedType;
  positionX: number;
  positionY: number;
  index?: number;
};

@ccclass('GameManager')
export class GameManager extends Component {
  @property(Node)
  player: Node;

  @property(Prefab)
  topObstacle: Prefab;

  @property(Prefab)
  bottomObstacle: Prefab;

  @property(Prefab)
  sensor: Prefab;

  @property(Label)
  scoreLabel: Label;

  isGameStarted: boolean = false;
  score: number = 0;
  speedPrefabs: MainPrefabsSpeedType = 25;

  start() {
    input.on(Input.EventType.TOUCH_START, this.jump, this);
    this.player.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    this.player.getComponent(Collider2D).on(Contact2DType.END_CONTACT, this.endContact, this);
  }

  private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
    if (otherCollider.node.name !== 'Sensor') {
      console.log('You loose');
    }
  }

  private endContact(selfCollider: Collider2D, otherCollider: Collider2D) {
    if (otherCollider.node.name === 'Sensor') {
      this.score += 1;
      this.scoreLabel.string = `Score: ${this.score}`;
    }
  }

  private jump() {
    let body: RigidBody2D = this.player.getComponent(RigidBody2D);
    body.linearVelocity = new Vec2(0, 0);
    body.applyLinearImpulseToCenter(new Vec2(0, 700), true);

    if (!this.isGameStarted) {
      this.schedule(() => this.generateObstacles(this.speedPrefabs), 0.8);

      this.isGameStarted = true;
    }
  }

  private generateObstacles(speed: MainPrefabsSpeedType) {
    let yRandom = (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 300);

    this.addMainPrefab({ prefab: this.topObstacle, speed, positionX: 550, positionY: 750 + yRandom });
    this.addMainPrefab({ prefab: this.bottomObstacle, speed, positionX: 550, positionY: -750 + yRandom });
    this.addMainPrefab({ prefab: this.sensor, speed, positionX: 550, positionY: yRandom });
  }

  private addMainPrefab({ prefab, speed, positionX, positionY, index = 3 }: AddSensorType) {
    let canvas = this.getCurrentCanvas();

    let mainPrefab = instantiate(prefab);
    mainPrefab.setParent(canvas);
    mainPrefab.setPosition(positionX, positionY);
    mainPrefab.setSiblingIndex(index);
    mainPrefab.getComponent(RigidBody2D).linearVelocity = new Vec2(-speed, 0);

    this.destroyMainNode(mainPrefab);
  }

  private getCurrentCanvas(): Node {
    return director.getScene().getChildByName('Canvas');
  }

  private destroyMainNode(prefab: Node) {
    let delay: number = 2;

    this.scheduleOnce(() => {
      prefab.destroy();
    }, delay);
  }

  update(deltaTime: number) {}
}
