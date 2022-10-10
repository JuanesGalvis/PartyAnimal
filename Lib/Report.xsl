<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html"/>
    <xsl:template match="/">

        <h2>REPORTE DE MASCOTAS 🐶 - CLIENTES 👥 - MEDICAMENTOS 💊</h2>
        
        <table>
            <tr class="encabezados">
                <th>Id</th>
                <th>Nombre</th>
                <th>Raza</th>
                <th>Edad</th>
                <th>Peso</th>
                <th>Medicamentos</th>
                <th>Cliente</th>
            </tr>
            <xsl:for-each select="Reporte/Mascota">
                <tr>
                    <td> <xsl:value-of select="Id"/> </td>
                    <td> <xsl:value-of select="Nombre"/> </td>
                    <td> <xsl:value-of select="Raza"/> </td>
                    <td> <xsl:value-of select="Edad"/> </td>
                    <td> <xsl:value-of select="Peso"/> </td>
                    <td>
                        <ul>
                            <xsl:for-each select="Medicamentos">
                                <li>
                                    <xsl:value-of select="Nombre"/>
                                </li>
                            </xsl:for-each>
                        </ul>
                    </td>
                    <td>
                        <xsl:value-of select="Id_Cliente/Nombres"/>
                        <xsl:text> </xsl:text>
                        <xsl:value-of select="Id_Cliente/Apellidos"/>
                    </td>
                </tr>
            </xsl:for-each>
        </table>
    </xsl:template>
</xsl:stylesheet>