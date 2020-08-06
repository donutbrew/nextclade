/* eslint-disable camelcase */

declare module 'auspice' {
  export declare type AuspiceQuery = Record<string, unknown>

  export declare type AuspiceState = {
    metadata?: AuspiceMetadata
    tree?: {
      name?: string | boolean
      loaded?: boolean
      nodes?: AuspiceTreeNode[]
      visibility?: number[]
      visibilityVersion?: number
      nodeColors?: string[]
      nodeColorsVersion?: number
      tipRadii?: any
      tipRadiiVersion?: number
      branchThickness?: number[]
      branchThicknessVersion?: number
      vaccines?: []
      version?: number
      idxOfInViewRootNode?: number
      visibleStateCounts?: any
      totalStateCounts?: any
      availableBranchLabels?: string[]
      selectedStrain?: any
      selectedClade?: any
      debug?: any
      stateCountAttrs?: any
    }
    frequencies?: {
      loaded?: boolean
      data?: any
      pivots?: any
      matrix?: any
      projection_pivot?: any
      version?: any
    }
    controls?: {
      defaults?: {
        distanceMeasure?: string
        layout?: string
        geoResolution?: string
        filters?: Record<string, string[]>
        colorBy?: string
        selectedBranchLabel?: string
        showTransmissionLines?: boolean
        panels?: Record<string, any>
      }
      available?: any
      canTogglePanelLayout?: boolean
      selectedBranch?: any
      selectedNode?: any
      region?: any
      search?: any
      strain?: any
      geneLength?: Record<string, number>
      mutType?: string
      temporalConfidence?: { exists?: boolean; display?: boolean; on?: boolean }
      layout?: string
      distanceMeasure?: string
      dateMin?: Date
      dateMinNumeric?: number
      dateMax?: string
      dateMaxNumeric?: number
      absoluteDateMin?: Date
      absoluteDateMinNumeric?: number
      absoluteDateMax?: string
      absoluteDateMaxNumeric?: number
      colorBy?: string
      colorByConfidence?: boolean
      colorScale?: {
        scale?: Record<string, any>
        continuous?: boolean
        colorBy?: string
        version?: number
        legendValues?: Record<string, any>
        legendBounds?: any
        genotype?: any
      }
      selectedBranchLabel?: string
      analysisSlider?: boolean
      geoResolution?: string
      filters?: Record<string, string[]>
      showDownload?: boolean
      quickdraw?: boolean
      mapAnimationDurationInMilliseconds?: number
      mapAnimationStartDate?: Date
      mapAnimationCumulative?: boolean
      mapAnimationShouldLoop?: boolean
      animationPlayPauseButton?: string
      panelsAvailable?: string[]
      panelsToDisplay?: string[]
      panelLayout?: string
      showTreeToo?: boolean
      showTangle?: boolean
      zoomMin?: any
      zoomMax?: any
      branchLengthsToDisplay?: string
      sidebarOpen?: boolean
      treeLegendOpen?: any
      mapLegendOpen?: any
      showOnlyPanels?: boolean
      showTransmissionLines?: boolean
      normalizeFrequencies?: boolean
      coloringsPresentOnTree?: any
      coloringsPresentOnTreeWithConfidence?: any
      absoluteZoomMin?: number
      absoluteZoomMax?: number
    }
    entropy?: {
      showCounts?: boolean
      loaded?: boolean
      annotations?: any[]
      lengthSequence?: number
      geneMap?: Record<string, any>
      bars?: any[]
      maxYVal?: number
      zoomMax?: any
      zoomMin?: any
      zoomCoordinates?: [any, any]
    }
    browserDimensions?: { browserDimensions?: { width?: number; height?: number; docHeight?: number } }
    notifications?: { stack?: any[]; counter?: number }
    narrative?: {
      loaded?: boolean
      blocks?: any
      blockIdx?: any
      pathname?: any
      display?: boolean
      title?: any
    }
    treeToo?: {
      loaded?: boolean
      nodes?: any
      name?: any
      visibility?: any
      visibilityVersion?: any
      nodeColors?: any
      nodeColorsVersion?: any
      tipRadii?: any
      tipRadiiVersion?: any
      branchThickness?: any
      branchThicknessVersion?: any
      vaccines?: boolean
      version?: any
      idxOfInViewRootNode?: any
      visibleStateCounts?: any
      totalStateCounts?: any
      availableBranchLabels?: any[]
      selectedStrain?: any
      selectedClade?: any
    }
    general?: { language?: string }
    query?: any
  }

  export declare interface AuspiceTreeNodeAttrs {
    div?: number
    GISAID_clade?: { value?: string }
    author?: { author?: string; paper_url?: string; title?: string; value?: string }
    clade_membership?: { value?: string }
    country?: { value?: string }
    country_exposure?: { value?: string }
    division?: { value?: string }
    division_exposure?: { value?: string }
    gisaid_epi_isl?: { value?: string }
    host?: { value?: string }
    legacy_clade_membership?: { value?: string }
    location?: { value?: string }
    num_date?: { confidence?: [number, number]; value?: number }
    pangolin_lineage?: { value?: number }
    recency?: { value?: number }
    region?: { confidence?: { Asia?: number }; entropy?: number; value?: string }
    subclade_membership?: { value?: string }
    submitting_lab?: { value?: string }
    url?: string
    [key: string]: { value?: string | number; entropy?: number; confidence?: number }
  }

  export declare interface AuspiceTreeBranchAttrs {
    labels?: {
      aa?: string
      clade?: string
      mlabel?: string
    }
    mutations?: Record<string, string[]>
  }

  export declare interface AuspiceTreeNode<NodeAttrs = AuspiceTreeNodeAttrs, BranchAttrs = AuspiceTreeBranchAttrs> {
    name: string
    node_attrs?: NodeAttrs
    branch_attrs?: BranchAttrs
    children?: AuspiceTreeNode<NodeAttrs, BranchAttrs>[]
  }

  export declare interface AuspiceMetadata {
    title?: string
    description?: string
    build_url?: string
    maintainers?: { name?: string; url?: string }[]
    updated?: string
    colorings: { key?: string; title?: string; type?: string; scale?: string[][] }[]
    display_defaults: {
      branch_label?: string
      color_by?: string
      distance_measure?: string
      geo_resolution?: string
      map_triplicate?: boolean
      transmission_lines?: boolean
    }
    filters?: string[]
    genome_annotations?: Record<
      string,
      { end?: number; seqid?: string; start?: number; strand?: string; type?: string }
    >
    geo_resolutions?: { demes?: Record<string, { latitude?: number; longitude?: number }>; key?: string }[]
    panels?: string[]
  }

  export declare interface AuspiceJsonV2 {
    version?: 'v2'
    meta: AuspiceMetadata
    tree?: AuspiceTreeNode
  }
}
