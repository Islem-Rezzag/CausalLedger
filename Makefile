.PHONY: validate-control-plane test-control-plane bootstrap-check

validate-control-plane:
	python scripts/validate-control-plane.py

test-control-plane:
	python -m pytest tests/test_control_plane_bootstrap.py

bootstrap-check: validate-control-plane test-control-plane
