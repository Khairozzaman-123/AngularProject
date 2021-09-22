using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace work_01.Models
{
    public class Member
    {
        public Member()
        {
            this.Payments = new List<Payment>();
        }
        public int MemberId { get; set; }
        [Required, StringLength(50), Display(Name = "Member Name")]
        public string Name { get; set; }
        [Required, StringLength(12)]
        public string Phone { get; set; }
        [Required, Column(TypeName = "money"), Display(Name = "Monthly Amount"), DisplayFormat(DataFormatString = "{0:#.##}", ApplyFormatInEditMode = true)]
        public decimal MAmount { get; set; }
        [StringLength(200)]
        public string MPicture { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
    }
    public class Payment
    {
        public int PaymentId { get; set; }
        [Required, Display(Name = "Payment Date")]
        [Column(TypeName = "date")]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime PMonth { get; set; }
        [Required, Display(Name = "Member Id")]
        public int MemberId { get; set; }
        [Required, Column(TypeName = "money"), Display(Name = "Payment Amount"), DisplayFormat(DataFormatString = "{0:#.##}", ApplyFormatInEditMode = true)]
        public decimal PAmount { get; set; }
        public virtual Member Member { get; set; }
    }
    public class GymCenterDbContext : DbContext
    {
        public GymCenterDbContext(DbContextOptions<GymCenterDbContext> options) : base(options)
        {

        }
        public DbSet<Member> Members { get; set; }
        public DbSet<Payment> Payments { get; set; }
    }
}
