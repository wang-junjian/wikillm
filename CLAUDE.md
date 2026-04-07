# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WikiLLM is a system for building LLM-powered personal knowledge bases. The workflow consists of:

1. **Data Ingest**: Source documents (articles, papers, repos, datasets, images) are indexed into a `raw/` directory
2. **Wiki Compilation**: An LLM incrementally "compiles" the raw data into a wiki of markdown files with summaries, backlinks, categorized concepts, and interlinked articles
3. **IDE**: Obsidian is used as the frontend to view raw data, compiled wiki, and visualizations
4. **Q&A**: The LLM can answer complex questions against the wiki by researching the related data
5. **Output**: Results are rendered as markdown files, Marp slides, or matplotlib images, viewable in Obsidian
6. **Linting**: LLM "health checks" find inconsistencies, impute missing data, suggest new article candidates
7. **Extra Tools**: Additional tools like a naive search engine over the wiki

## Directory Structure

The project will eventually include these key directories:

- `raw/` - Source documents and unprocessed data
- `wiki/` - LLM-compiled markdown wiki with articles, summaries, and links
- `tools/` - CLI tools for searching, processing, and enhancing the wiki

## Core Principles

- The LLM writes and maintains all wiki data; manual edits are rare
- User explorations and queries are filed back into the wiki to enhance it
- The system focuses on markdown files and Obsidian-compatible formats
- Images are downloaded locally for easy LLM reference
