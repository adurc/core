<p align="center">
  <a href="http://adurc.io"><img src="https://raw.githubusercontent.com/adurc/resources/main/logo/logo.svg" alt="Adurc Logo" width="320" /></a>
</p>

<p align="center">Adurc is an open source framework for build an ORM, supporting multiples data sources and service layers.</p>
<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@adurc/core.svg" alt="NPM Version" /></a>
</p>

## What is Adurc?

Adurc is an open source framework for build an ORM, supporting multiples data sources and service layers.

It is built on four fundamental components:

### Models

Represents meta entity how to: fields, relations, directives, etc..

### Directives

The addons built around Adurc have the possibility of defining directives in order to record additional information about a model or field.

### Drivers

They are responsible for processing the queries requested by Adurc.

### Processors

Adurc offers the possibility of extending the core with processors (yields). There are two types of processors: Initializers and Middlewares

## Getting started

The fastest way to get started with Adurc is by following the [**Quickstart (5 min)**](https://www.adurc.io/docs/getting-started/quickstart)

## How does Adurc work

This section provides a high-level overview of how Adurc works and its most important technical components. For a more thorough introduction, visit the [Adurc documentation](https://www.adurc.io/docs/).

### Adurc Builder

To facilitate the build of Adurc, there is the AdurcBuilder class.

From him we have the possibility to register the different components that we are going to use.

### Adurc Models

Adurc stores in models all information required for build common operations CRUDA (Create, Read, Update, Delete, Aggregate)

Models can be registered directly in Adurc from builder, an alternative, is configure an "introspector".

### Arduc Directive

In the models and fields, we can add additional information so that they are later processed by the different components registered in the core. For this, directives are used.
