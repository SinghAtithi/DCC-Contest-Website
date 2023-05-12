#!/bin/bash

# Function to count the number of lines in a file
count_lines() {
    local file=$1
    local lines=$(wc -l < "$file")
    echo "$lines"
}

# Function to recursively count the number of lines in all files within a directory
count_lines_recursive() {
    local dir=$1
    local total_lines=0

    # Loop over all items in the directory
    for item in "$dir"/*; do
        if [[ -d "$item" ]]; then
            # If the item is a directory, recursively count the lines in it
            sub_lines=$(count_lines_recursive "$item")
            total_lines=$((total_lines + sub_lines))
        elif [[ -f "$item" ]]; then
            # If the item is a file, count the lines in it
            sub_lines=$(count_lines "$item")
            total_lines=$((total_lines + sub_lines))
        fi
    done

    echo "$total_lines"
}

# Usage: call the count_lines_recursive function with the path to the directory you want to count lines in
count_lines_recursive "/"
