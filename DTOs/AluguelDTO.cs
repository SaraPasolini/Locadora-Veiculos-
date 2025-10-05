namespace VendaVeiculosApi.DTOs;

public class AluguelDTO
{
    public int Id { get; set; }
    public int ClienteId { get; set; }
    public int VeiculoId { get; set; }
    public DateTime DataInicio { get; set; }
    public DateTime? DataDevolucao { get; set; }
    public int QuilometragemInicial { get; set; }
    public int? QuilometragemFinal { get; set; }
    public decimal ValorDiaria { get; set; }
    public decimal? ValorTotal { get; set; }
}
