run:
	@echo "Starting development server..."
	cd pro-data-vis && npm run dev

push:
	@if [ "$(msg)" = "" ]; then \
		echo "Please provide a commit message: make push msg='Your message'"; \
		exit 1; \
	fi
	git add .
	git commit -m "$(msg)"
	git push
