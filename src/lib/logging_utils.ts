type Style = Record<string, string>;


export class StyleBuilder {
	private _style: Style = {};

	public color(color: string) {
		this._style['color'] = color;
		return this;
	}

	public background(color: string) {
		this._style['background'] = color;
		return this;
	}

	public bold() {
		this._style['font-weight'] = 'bold';
		return this;
	}

	public italic() {
		this._style['font-style'] = 'italic';
		return this;
	}

	public underline() {
		this._style['text-decoration'] = 'underline';
		return this;
	}

	public size(size: number) {
		this._style['font-size'] = `${size}px`
		return this;
	}

	public upper() {
		this._style['text-transform'] = 'uppercase';
		return this;
	}

	public lower() {
		this._style['text-transform'] = 'lowercase';
		return this;
	}

	public raw(style: Record<string, string>) {
		this._style = { ...this._style, ...style };
	}

	public build() {
		return Object.entries(this._style).map(([k, v]) => `${k}: ${v};`).join('')
	}
}

export class Stylize {
	private _styles: Array<StyleBuilder> = [];
	private _texts: Array<string> = [];

	private _current_style: StyleBuilder = new StyleBuilder

	public color(color: string) {
		this._current_style.color(color);
		return this;
	}

	public background(color: string) {
		this._current_style.background(color);
		return this;
	}

	public bold() {
		this._current_style.bold()
		return this;
	}

	public italic() {
		this._current_style.italic()
		return this;
	}

	public underline() {
		this._current_style.underline()
		return this;
	}

	public size(size: number) {
		this._current_style.size(size)
		return this;
	}

	public raw(style: Record<string, string>) {
		this._current_style.raw(style);
		return this;
	}

	public style(style: StyleBuilder) {
		this._current_style = style;
		return this;
	}

	public space(length: number) {
		this._texts.push(' '.repeat(length));
		this._styles.push(new StyleBuilder);
		return this;
	}

	public upper() {
		this._current_style.upper()
		return this;
	}
	public lower() {
		this._current_style.lower()
	}

	public apply(text: string, { padding }: { padding?: { left?: number, right?: number } | number } = {}) {
		const left = typeof padding === 'number' ? padding : padding?.['left'] ?? 0;
		const right = typeof padding === 'number' ? padding : padding?.['right'] ?? 0;

		this._texts.push(`${' '.repeat(left)}${text}${' '.repeat(right)}`)
		this._styles.push(this._current_style);
		this._current_style = new StyleBuilder;
		return this;
	}

	public build() {
		const text = this._texts.map(t => `%c${t}`).join('');
		const styles = this._styles.map(style => style.build())
		return [text, ...styles]
	}
}

