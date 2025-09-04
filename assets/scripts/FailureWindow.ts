import { _decorator, Component, director, RigidBody2D } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('FailureWindow')
export class FailureWindow extends Component {
	start() {}

	private restartGame() {
		let gameManager = director.getScene().getChildByName('GameManager').getComponent(GameManager);

		gameManager.failureWindow.active = false;

		gameManager.player.getComponent(RigidBody2D).sleep();
		gameManager.player.setPosition(-200, 0);
		gameManager.player.setRotationFromEuler(0, 0);

		gameManager.score = 0;
		gameManager.scoreLabel.string = 'Score: 0';

		gameManager.isGameStarted = false;

		director
			.getScene()
			.getChildByName('Canvas')
			.children.forEach((value) => {
				if (value.name === 'TopObstacle' || value.name === 'BottomObstacle' || value.name === 'Sensor') {
					value.destroy();
				}
			});
	}

	private mainMenu() {
		director.loadScene('MainMenu');
	}

	update(deltaTime: number) {}
}
