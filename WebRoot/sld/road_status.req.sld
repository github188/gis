<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0"
 xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"
 xmlns="http://www.opengis.net/sld"
 xmlns:ogc="http://www.opengis.net/ogc"
 xmlns:xlink="http://www.w3.org/1999/xlink"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <NamedLayer>
        <Name>hn_postgis:db_motorway_line</Name>
        <UserStyle>
            <Title/>
            <FeatureTypeStyle>
                <FeatureTypeName>Feature</FeatureTypeName>
                <SemanticTypeIdentifier>generic:geometry</SemanticTypeIdentifier>
                <SemanticTypeIdentifier>simple</SemanticTypeIdentifier>
                <Rule>
                    <Name>ruleg1</Name>
                    <MinScaleDenominator>1000000.0</MinScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#00FF00</CssParameter>
                            <CssParameter name="stroke-width">5.0</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
                <Rule>
                    <Name>ruleg2</Name>
                    <MaxScaleDenominator>1000000.0</MaxScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#00FF00</CssParameter>
                            <CssParameter name="stroke-width">5.0</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                    <TextSymbolizer>
                        <Label>
                            <ogc:PropertyName>name</ogc:PropertyName>
                        </Label>
                        <Font>
                            <CssParameter name="font-family">SimSun</CssParameter>
                            <CssParameter name="font-size">12.0</CssParameter>
                            <CssParameter name="font-style">normal</CssParameter>
                            <CssParameter name="font-weight">normal</CssParameter>
                        </Font>
                        <LabelPlacement>
                            <LinePlacement>
                                <PerpendicularOffset>10.0</PerpendicularOffset>
                            </LinePlacement>
                        </LabelPlacement>
                        <Fill>
                            <CssParameter name="fill">#000000</CssParameter>
                        </Fill>
                    </TextSymbolizer>
                </Rule>
                <Rule>
                    <Name>ruler1</Name>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThan>
                                <ogc:PropertyName>length</ogc:PropertyName>
                                <ogc:Literal>0.8</ogc:Literal>
                            </ogc:PropertyIsGreaterThan>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>length</ogc:PropertyName>
                                <ogc:Literal>1</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#FF0000</CssParameter>
                            <CssParameter name="stroke-width">5.0</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
                <Rule>
                    <Name>ruley1</Name>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThan>
                                <ogc:PropertyName>length</ogc:PropertyName>
                                <ogc:Literal>1.5</ogc:Literal>
                            </ogc:PropertyIsGreaterThan>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>length</ogc:PropertyName>
                                <ogc:Literal>2</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#EDB903</CssParameter>
                            <CssParameter name="stroke-width">5.0</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
            </FeatureTypeStyle>
        </UserStyle>
    </NamedLayer>
</StyledLayerDescriptor>