
#rebame all .tsx to .js in the project
rename_tsx:
	@find . -name "*.tsx" -exec rename 's/\.tsx$$/.js/' {} \;