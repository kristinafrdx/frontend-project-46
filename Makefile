install:
	npm ci

publish:
	npm publish --dry-run

make lint:
	npx eslint .

test:
	make -C app test

report:
	make -C app report