import * as vs from "vscode";
import { DartCapabilities } from "../../../shared/capabilities/dart";
import { IAmDisposable } from "../../../shared/interfaces";
import { disposeAll } from "../../../shared/utils";
import { DevToolsManager } from "../../sdk/dev_tools/manager";
import { MySimpleBaseWebViewProvider } from "./base_view_provider";

export class FlutterDtdSidebar implements IAmDisposable {
	protected readonly disposables: vs.Disposable[] = [];

	constructor(
		readonly devTools: DevToolsManager,
		dartCapabilities: DartCapabilities,
	) {
		const webViewProvider = new MyWebViewProvider(devTools, dartCapabilities);
		this.disposables.push(webViewProvider);
		this.disposables.push(vs.window.registerWebviewViewProvider("dartFlutterSidebar", webViewProvider, { webviewOptions: { retainContextWhenHidden: true } }));
	}

	public dispose(): any {
		disposeAll(this.disposables);
	}
}

class MyWebViewProvider extends MySimpleBaseWebViewProvider {
	get pageName(): string {
		return "Flutter Sidebar";
	}
	get pageRoute(): string {
		return "editorSidebar";
	}
}
