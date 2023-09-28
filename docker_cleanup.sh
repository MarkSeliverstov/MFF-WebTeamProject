#!/bin/bash

# Function to display usage information
usage() {
  echo "Usage: $0 [options]"
  echo "Options:"
  echo "  -c, --containers   Remove all containers"
  echo "  -i, --images       Remove all images"
  echo "  -v, --volumes      Remove all volumes"
  echo "  -n, --networks     Remove all networks"
  echo "  -h, --help         Display this help message"
}

# Default behavior: Run all commands
run_all=true

# Parse command-line options
while [[ $# -gt 0 ]]; do
  case "$1" in
    -c|--containers)
      run_all=false
      remove_containers=true
      ;;
    -i|--images)
      run_all=false
      remove_images=true
      ;;
    -v|--volumes)
      run_all=false
      remove_volumes=true
      ;;
    -n|--networks)
      run_all=false
      remove_networks=true
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Invalid option: $1"
      usage
      exit 1
      ;;
  esac
  shift
done

# Function to run a command and display results
run_command() {
  local command_name="$1"
  local command="$2"
  echo "Running '$command_name'..."
  deleted_ids=$(eval "$command")
  if [ -n "$deleted_ids" ]; then
    echo "$command_name completed successfully. Deleted:"
    echo "$deleted_ids"
  else
    echo "$command_name completed successfully. No items deleted."
  fi
}

# Execute the selected commands or all commands
if [ "$run_all" = true ]; then
  echo "Removing all containers, images, volumes, and networks..."

  # Stop and remove all containers
  run_command "Stop containers" "docker stop \$(docker ps -aq) 2>/dev/null"
  run_command "Remove containers" "docker rm \$(docker ps -aq) 2>/dev/null"

  # Delete all images
  run_command "Remove images" "docker rmi \$(docker images -q) 2>/dev/null"

  # Prune all volumes
  run_command "Prune volumes" "docker volume rm \$(docker volume ls -q) 2>/dev/null"

  # Remove all networks
  run_command "Remove networks" "docker network prune -f"

  echo "Cleanup completed."
else
  echo "Performing selected cleanup tasks..."

  # Run selected commands
  if [ "$remove_containers" = true ]; then
    run_command "Stop and remove containers" "docker stop \$(docker ps -a -q) 2>/dev/null"
    run_command "Remove containers" "docker rm \$(docker ps -a -q) 2>/dev/null"
  fi

  if [ "$remove_images" = true ]; then
    run_command "Remove images" "docker rmi \$(docker images -q) 2>/dev/null"
  fi

  if [ "$remove_volumes" = true ]; then
    run_command "Prune volumes" "docker volume rm \$(docker volume ls -q) 2>/dev/null"
  fi

  if [ "$remove_networks" = true ]; then
    run_command "Remove networks" "docker network prune -f"
  fi

  echo "Cleanup completed."
fi

