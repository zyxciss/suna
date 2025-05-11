import docker
import os

try:
    print("--- Docker Connection Test ---")

    # Check if DOCKER_HOST is set and print it
    docker_host = os.environ.get('DOCKER_HOST')
    print(f"DOCKER_HOST environment variable: {docker_host if docker_host else 'Not set (using default Windows named pipe)'}")

    # Attempt to connect to the Docker daemon using default settings
    client = docker.from_env()
    print("Successfully connected to Docker daemon!")

    # Try listing containers to confirm full access
    print("\n--- Listing Running Containers ---")
    containers = client.containers.list()
    print(f"Found {len(containers)} running containers:")
    for c in containers:
        print(f"- Name: {c.name}, Image: {c.image.tags}")

    # Try pulling an image (tests if the daemon can pull, often shows "already exists" if local)
    print("\n--- Attempting to Pull/Find Image: kortix/suna:0.1 ---")
    try:
        image = client.images.pull('kortix/suna:0.1')
        print(f"Successfully pulled/found image: {image.tags}")
    except docker.errors.APIError as e:
        print(f"Error during image pull/find: {e}")
        if "not found" in str(e).lower():
            print("This error specifically indicates the image could not be pulled/found by the daemon.")
        else:
            print("This is a different API error during image operation.")

except docker.errors.DockerException as e:
    print(f"\n!!! ERROR: Failed to connect to Docker daemon: {e} !!!")
    print("Please ensure Docker Desktop is running and accessible.")
    print("Possible reasons: Docker Desktop not running, permissions issues, or conflicting Docker installations.")
except Exception as e:
    print(f"\nAn unexpected error occurred: {e}")

print("\n--- Test Complete ---")